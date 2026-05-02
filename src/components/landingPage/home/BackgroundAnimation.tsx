'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Style 3 uses a black background
    renderer.setClearColor(0x000000, 1);
    camera.position.set(0, 0, 400); // Increased distance slightly for better framing of the large torus

    const texture = (function() {
      const w = 64, h = 64; // Increased resolution for smoother particle glow
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const context = canvas.getContext('2d');
      if (context) {
        const gradient = context.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.2, '#00ffff');
        gradient.addColorStop(0.4, '#000040');
        gradient.addColorStop(1, '#000000');
        context.fillStyle = gradient;
        context.fillRect(0, 0, w, h);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }());

    const params = {
      radius: 100,
      tube: 40,
      radialSegments: 512,
      tubularSegments: 64,
      p: 2,
      q: 3
    };

    // Modern TorusKnotGeometry segment order: (radius, tube, tubularSegments, radialSegments, p, q)
    const geometry = new THREE.TorusKnotGeometry(
      params.radius,
      params.tube,
      params.tubularSegments,
      params.radialSegments,
      params.p,
      params.q
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false, // Helps with additive blending transparency issues
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    containerRef.current.appendChild(renderer.domElement);

    let step = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      step += 0.005;
      points.rotation.x = step;
      points.rotation.z = step;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-20 h-full w-full overflow-hidden" />;
};
