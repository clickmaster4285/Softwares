'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 12.0 + time * 1.8) * 0.08 * intensity;
    pos.x += cos(pos.y * 10.0 + time * 1.4) * 0.06 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    float noise = sin(uv.x * 25.0 + time * 2.0) * cos(uv.y * 20.0 + time * 1.5);
    noise += sin(uv.x * 40.0 - time * 3.0) * 0.4;
    
    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    
    float glow = 1.0 - length(uv - 0.5) * 2.2;
    glow = pow(glow, 2.8);
    
    gl_FragColor = vec4(color * glow * intensity, glow * 0.85);
  }
`;

export function NeonOrbs3D({
  position,
  color1 = "#ff5722",
  color2 = "#ffffff",
}: {
  position: [number, number, number];
  color1?: string;
  color2?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2]
  );

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime;
    uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2.2) * 0.35;

    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.6;
      mesh.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.4) * 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[5.5, 5.5, 48, 48]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}