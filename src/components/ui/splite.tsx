"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[200px] w-full items-center justify-center">
      <span className="loader" aria-label="Loading 3D scene" />
    </div>
  ),
});

export interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-[200px] w-full items-center justify-center">
          <span className="loader" aria-label="Loading 3D scene" />
        </div>
      }
    >
      {/* react-spline defaults ParentSize to overflow:hidden override so the model isn’t clipped */}
      <Spline scene={scene} className={className} style={{ overflow: "visible" }} />
    </Suspense>
  );
}
