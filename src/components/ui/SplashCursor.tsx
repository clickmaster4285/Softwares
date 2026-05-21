'use client';

import { useEffect, useRef } from 'react';

type Props = {
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  RAINBOW_MODE?: boolean;
  COLOR?: string;
  SHADING?: boolean;
};

export default function SplashCursor({
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  RAINBOW_MODE = true,
  COLOR = '#ff0000',
  SHADING = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (!gl) gl = canvas.getContext('webgl') as any;
    if (!gl) return;

    let isAlive = true;

    // -----------------------------
    // BASIC STATE
    // -----------------------------
    const pointers: any[] = [
      {
        x: 0,
        y: 0,
        px: 0,
        py: 0,
        dx: 0,
        dy: 0,
        down: false,
        moved: false,
        color: [1, 0, 0],
      },
    ];

    // -----------------------------
    // RESIZE
    // -----------------------------
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // -----------------------------
    // SIMPLE DRAW (FLUID-LITE VERSION)
    // NOTE: full shader sim is huge, this keeps effect lightweight
    // -----------------------------
    const draw = () => {
      if (!isAlive) return;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      for (const p of pointers) {
        if (p.moved) {
          const x = p.x * canvas.width;
          const y = (1 - p.y) * canvas.height;

          const gradient = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, gradient);

          const size = SPLAT_RADIUS * canvas.width;

          const r = RAINBOW_MODE ? Math.random() : 1;
          const g = RAINBOW_MODE ? Math.random() : 0;
          const b = RAINBOW_MODE ? Math.random() : 0;

          gl.clearColor(r * 0.2, g * 0.2, b * 0.2, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);

          p.moved = false;
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    // -----------------------------
    // POINTER EVENTS
    // -----------------------------
    const onMove = (e: MouseEvent) => {
      const p = pointers[0];

      p.px = p.x;
      p.py = p.y;

      p.x = e.clientX / window.innerWidth;
      p.y = e.clientY / window.innerHeight;

      p.dx = p.x - p.px;
      p.dy = p.y - p.py;

      p.moved = true;
    };

    window.addEventListener('mousemove', onMove);

    // -----------------------------
    // CLEANUP
    // -----------------------------
    return () => {
      isAlive = false;

      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [SPLAT_RADIUS, SPLAT_FORCE, RAINBOW_MODE, COLOR]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}