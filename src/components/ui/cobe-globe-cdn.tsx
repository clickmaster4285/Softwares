"use client";

import {
  useEffect,
  useRef,
  useCallback,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import createGlobe from "cobe";

import { cn } from "@/lib/utils";
import {
  anglosphereRegionArcs,
  anglosphereRegionMarkers,
} from "@/src/data/globe-region-markers";

export interface CdnMarker {
  id: string;
  location: [number, number];
  region: string;
  /** Full place name shown on the pin label (falls back to region). */
  name?: string;
}

export interface CdnArc {
  id: string;
  from: [number, number];
  to: [number, number];
}

export type GlobeCdnTheme = "light" | "dark";

export interface GlobeCdnProps {
  markers?: CdnMarker[];
  arcs?: CdnArc[];
  className?: string;
  speed?: number;
  /** Matches site sections: dark hero (orange on slate) or light pages. */
  theme?: GlobeCdnTheme;
  /**
   * HTML anchor labels (pyramids + chips). Off by default when there are many pins.
   * Set true only for small marker sets.
   */
  showMarkerOverlays?: boolean;
  /** "k req/s" chips on arcs off when false or when there are many markers. */
  showArcOverlays?: boolean;
}

const defaultMarkers: CdnMarker[] = anglosphereRegionMarkers;
const defaultArcs: CdnArc[] = anglosphereRegionArcs;

const ORANGE: [number, number, number] = [249 / 255, 115 / 255, 22 / 255];

const globePalette = (theme: GlobeCdnTheme, denseMap: boolean) =>
  theme === "dark"
    ? {
        dark: 1,
        phi: 0,
        theta: 0.2,
        diffuse: 1.45,
        mapSamples: denseMap ? 20000 : 16000,
        mapBrightness: denseMap ? 8.2 : 7.5,
        ...(denseMap ? { mapBaseBrightness: 0.04 } : {}),
        baseColor: [0.07, 0.08, 0.11] as [number, number, number],
        markerColor: ORANGE,
        glowColor: [0.42, 0.16, 0.05] as [number, number, number],
        arcColor: [1, 0.58, 0.26] as [number, number, number],
        markerElevation: 0.02,
        arcWidth: 0.55,
        arcHeight: 0.26,
        opacity: 0.88,
      }
    : {
        dark: 0,
        phi: 0,
        theta: 0.2,
        diffuse: 1.52,
        mapSamples: denseMap ? 22000 : 16000,
        mapBrightness: denseMap ? 11.2 : 10,
        ...(denseMap ? { mapBaseBrightness: 0.035 } : {}),
        baseColor: [1, 1, 1] as [number, number, number],
        markerColor: [0, 0, 0] as [number, number, number],
        glowColor: [0.94, 0.93, 0.91] as [number, number, number],
        arcColor: [0.08, 0.1, 0.14] as [number, number, number],
        markerElevation: 0.02,
        arcWidth: 0.45,
        arcHeight: 0.24,
        opacity: denseMap ? 0.78 : 0.7,
      };

const OVERLAY_MARKER_CAP = 22;
const OVERLAY_ARC_CAP = 12;

export function GlobeCdn({
  markers = defaultMarkers,
  arcs = defaultArcs,
  className,
  speed = 0.003,
  theme = "light",
  showMarkerOverlays: showMarkerOverlaysProp,
  showArcOverlays: showArcOverlaysProp,
}: GlobeCdnProps) {
  const densePins = markers.length > 36;
  const showMarkerOverlays =
    showMarkerOverlaysProp ?? markers.length <= OVERLAY_MARKER_CAP;
  const showArcOverlays =
    showArcOverlaysProp ??
    (markers.length <= OVERLAY_MARKER_CAP &&
      arcs.length > 0 &&
      arcs.length <= OVERLAY_ARC_CAP);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [traffic, setTraffic] = useState<{ id: string; value: number }[]>([]);

  useEffect(() => {
    setTraffic(
      arcs.map((a, i) => ({
        id: a.id,
        value: [420, 380, 290, 185, 156, 134, 210, 178][i] ?? 120 + (i % 5) * 22,
      })),
    );
  }, [arcs]);

  useEffect(() => {
    if (arcs.length === 0 || !showArcOverlays) return;
    const interval = setInterval(() => {
      setTraffic((data) =>
        data.map((t) => ({
          ...t,
          value: Math.max(50, t.value + Math.floor(Math.random() * 21) - 10),
        })),
      );
    }, 250);
    return () => clearInterval(interval);
  }, [arcs.length, showArcOverlays]);

  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let rafId = 0;
    let phi = 0;
    let resizeObserver: ResizeObserver | null = null;
    const palette = globePalette(theme, densePins);
    const markerDotSize = densePins ? 0.004 : markers.length > 18 ? 0.007 : 0.012;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        ...palette,
        markers: markers.map((m) => ({
          location: m.location,
          size: markerDotSize,
          id: m.id,
        })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
      });

      function animate() {
        if (!isPausedRef.current) phi += speed;
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        rafId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      });
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          resizeObserver?.disconnect();
          resizeObserver = null;
          init();
        }
      });
      resizeObserver.observe(canvas);
    }

    return () => {
      resizeObserver?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (globe) globe.destroy();
    };
  }, [markers, arcs, speed, theme, densePins]);

  const pyramidFaceStyle = (nth: number): CSSProperties => {
    const transforms = [
      "rotateY(0deg) translateZ(4px) rotateX(19.5deg)",
      "rotateY(120deg) translateZ(4px) rotateX(19.5deg)",
      "rotateY(240deg) translateZ(4px) rotateX(19.5deg)",
      "rotateX(-90deg) rotateZ(60deg) translateY(4px)",
    ];
    const colorsLight = ["#111", "#333", "#555", "#222"];
    const colorsDark = ["#7c2d12", "#c2410c", "#fb923c", "#9a3412"];
    const colors = theme === "dark" ? colorsDark : colorsLight;
    return {
      position: "absolute",
      left: -0.5,
      top: 0,
      width: 0,
      height: 0,
      borderLeft: "6.5px solid transparent",
      borderRight: "6.5px solid transparent",
      borderBottom: `13px solid ${colors[nth]}`,
      transformOrigin: "center bottom",
      transform: transforms[nth],
    };
  };

  const regionChipClass =
    theme === "dark"
      ? "border border-primary/45 bg-slate-950/90 text-white shadow-lg shadow-black/40"
      : "bg-white text-foreground shadow-md shadow-black/20";

  const trafficChipClass =
    theme === "dark"
      ? "bg-primary text-primary-foreground shadow-md shadow-primary/35"
      : "bg-foreground text-background";

  return (
    <div className={cn("relative aspect-square select-none", className)}>
      <style>{`
        @keyframes pyramid-spin {
          0% { transform: rotateX(20deg) rotateY(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg); }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="size-full cursor-grab rounded-full opacity-0 transition-opacity duration-[1.2s] ease-out touch-none"
      />
      {showMarkerOverlays &&
        markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
          
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            pointerEvents: "none",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.3s, filter 0.3s",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              position: "relative",
              transformStyle: "preserve-3d",
              animation: "pyramid-spin 4s linear infinite",
            }}
          >
            {[0, 1, 2, 3].map((n) => (
              <div key={n} style={pyramidFaceStyle(n)} />
            ))}
          </div>
          <span
            title={m.name ?? m.region}
            className={cn(
              "max-w-[min(11rem,38vw)] truncate rounded px-1.5 py-0.5 text-center font-sans text-[0.52rem] font-medium leading-tight tracking-tight sm:text-[0.58rem]",
              regionChipClass,
            )}
          >
            {m.name ?? m.region}
          </span>
        </div>
      ))}
      {showArcOverlays &&
        traffic.map((t) => (
        <div
          key={t.id}
          style={{
            position: "absolute",
      
            positionAnchor: `--cobe-arc-${t.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            pointerEvents: "none",
            opacity: `var(--cobe-visible-arc-${t.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-arc-${t.id}, 0)) * 8px))`,
            transition: "opacity 0.3s, filter 0.3s",
          }}
          className={cn(
            "rounded px-2 py-0.5 font-mono text-[0.5rem] font-medium whitespace-nowrap",
            trafficChipClass,
          )}
        >
          {t.value}k req/s
        </div>
      ))}
    </div>
  );
}
