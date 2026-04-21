'use client';

import { SplineScene } from '@/components/ui/splite';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';

/**
 * Standalone demo card — same building blocks as the homepage hero Spline panel.
 * Uses your orange spotlight + dark glass card to match the site palette.
 */
export function SplineSceneBasic(): JSX.Element {
  return (
    <Card className="relative h-[500px] w-full overflow-hidden border-white/15 bg-black/45 shadow-2xl shadow-black/40 backdrop-blur-md">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgb(249, 115, 22)" />

      <div className="flex h-full flex-col md:flex-row">
        <div className="relative z-10 flex flex-1 flex-col justify-center p-8">
          <h2 className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Interactive 3D
          </h2>
          <p className="mt-4 max-w-lg text-neutral-300">
            Bring your UI to life with 3D scenes. Immersive experiences that match your brand.
          </p>
        </div>

        <div className="relative min-h-[240px] flex-1 md:min-h-0">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>
    </Card>
  );
}
