'use client';

import { Canvas } from '@react-three/fiber';
import { NeonOrbs3D } from './neon-orbs-3d';

export function NeonOrbs() {
  return (
    <div className="absolute inset-0 -z-30">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ff8c00" />
        
        {/* Multiple glowing orbs */}
        <NeonOrbs3D position={[-3.5, 2.5, -2]} color1="#ff6b00" color2="#ffffff" />
        <NeonOrbs3D position={[4, -3, -1]} color1="#ff8c00" color2="#fff7ed" />
        <NeonOrbs3D position={[-2, -4, -3]} color1="#ff4500" color2="#ffe0b3" />
        <NeonOrbs3D position={[3.5, 3, -2.5]} color1="#ff7a00" color2="#ffffff" />
      </Canvas>
    </div>
  );
}