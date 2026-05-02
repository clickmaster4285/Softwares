'use client';

import React, { useEffect, useRef } from 'react';

export const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const holder = containerRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    holder.appendChild(canvas);

    const pi = Math.PI;
    const pi2 = 2 * Math.PI;

    const rnd = (a: number, b?: number) => {
      if (b === undefined) return Math.random() * a;
      return a + Math.random() * (b - a);
    };

    const rnd_sign = () => (Math.random() > 0.5 ? 1 : -1);
    const dtr = (deg: number) => (deg * pi) / 180;

    class Line {
      angle: number[];
      color: string;

      constructor(wave: Wave, color: string) {
        const angle = wave.angle;
        const speed = wave.speed;

        this.angle = [
          Math.sin((angle[0] += speed[0])),
          Math.sin((angle[1] += speed[1])),
          Math.sin((angle[2] += speed[2])),
          Math.sin((angle[3] += speed[3])),
        ];

        this.color = color;
      }
    }

    class Wave {
      waves: Waves;
      Lines: Line[];
      angle: number[];
      speed: number[];

      constructor(waves: Waves) {
        this.waves = waves;
        const speed = waves.options.speed;

        this.Lines = [];
        this.angle = [rnd(pi2), rnd(pi2), rnd(pi2), rnd(pi2)];
        this.speed = [
          rnd(speed[0], speed[1]) * rnd_sign(),
          rnd(speed[0], speed[1]) * rnd_sign(),
          rnd(speed[0], speed[1]) * rnd_sign(),
          rnd(speed[0], speed[1]) * rnd_sign(),
        ];
      }

      update() {
        const color = this.waves.color;
        this.Lines.push(new Line(this, color));
        if (this.Lines.length > this.waves.options.width) {
          // Reuse objects instead of creating new ones
          const removed = this.Lines.shift();
          if (removed) {
            // Clear the removed line for garbage collection
            removed.angle = [0, 0, 0, 0];
          }
        }
      }

      draw() {
        const waves = this.waves;
        const ctx = waves.ctx;
        const radius = waves.radius;
        const radius3 = radius / 3;
        const x = waves.centerX;
        const y = waves.centerY;
        const rotation = dtr(waves.options.rotation);
        const amplitude = waves.options.amplitude;

        this.Lines.forEach((line) => {
          const angle = line.angle;

          const x1 = x - radius * Math.cos(angle[0] * amplitude + rotation);
          const y1 = y - radius * Math.sin(angle[0] * amplitude + rotation);
          const x2 = x + radius * Math.cos(angle[3] * amplitude + rotation);
          const y2 = y + radius * Math.sin(angle[3] * amplitude + rotation);
          const cpx1 = x - radius3 * Math.cos(angle[1] * amplitude * 2);
          const cpy1 = y - radius3 * Math.sin(angle[1] * amplitude * 2);
          const cpx2 = x + radius3 * Math.cos(angle[2] * amplitude * 2);
          const cpy2 = y + radius3 * Math.sin(angle[2] * amplitude * 2);

          ctx.strokeStyle = line.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
          ctx.stroke();
        });
      }
    }

    class Waves {
      holder: HTMLElement;
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      options: any;
      waves: Wave[];
      hue: number;
      hueFw: boolean;
      color: string = '';
      width: number = 0;
      height: number = 0;
      scale: number = 1;
      radius: number = 0;
      centerX: number = 0;
      centerY: number = 0;

      constructor(holder: HTMLElement, options: any) {
        this.holder = holder;
        this.canvas = canvas;
        this.ctx = ctx!;
        this.options = {
          rotation: 45,
          waves: 5,
          width: 100,
          hue: [0, 1], // Toggle between 0 and 1 for blue/gold
          amplitude: 0.5,
          background: true,
          preload: true,
          speed: [0.004, 0.008],
          ...options,
        };

        this.waves = [];
        this.hue = 0;
        this.hueFw = true;

        this.resize();
        this.init(this.options.preload);
      }

      init(preload: boolean) {
        for (let i = 0; i < this.options.waves; i++) {
          this.waves[i] = new Wave(this);
        }
        if (preload) this.preload();
      }

      preload() {
        for (let i = 0; i < this.options.waves; i++) {
          this.updateColor();
          for (let j = 0; j < this.options.width; j++) {
            this.waves[i].update();
          }
        }
      }

      render() {
        this.updateColor();
        this.clear();
        if (this.options.background) {
          this.background();
        }
        this.waves.forEach((wave) => {
          wave.update();
          wave.draw();
        });
      }

      clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }

      background() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#020617'); // Dark background
        gradient.addColorStop(1, this.color); // Color pulse at bottom
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
      }

      resize() {
        const width = this.holder.offsetWidth;
        const height = this.holder.offsetHeight;
        this.scale = window.devicePixelRatio || 1;
        this.width = width * this.scale;
        this.height = height * this.scale;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / 2;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
      }

      updateColor() {
        this.hue += this.hueFw ? 0.001 : -0.001; // Slower color transition
        if (this.hue > 1) {
          this.hue = 1;
          this.hueFw = false;
        } else if (this.hue < 0) {
          this.hue = 0;
          this.hueFw = true;
        }

        // Pre-calculate color values to avoid repeated calculations
        const r = Math.floor(63 + (255 - 63) * this.hue);
        const g = Math.floor(155 + (215 - 155) * this.hue);
        const b = Math.floor(255 + (0 - 255) * this.hue);

        this.color = `rgba(${r},${g},${b}, 0.1)`; // Reduced opacity
      }
    }

    const wavesInstance = new Waves(holder, {
      waves: 3, // Reduced from 4 to 3
      width: 100, // Reduced from 150 to 100
    });

    let animationId: number;
    let lastTime = 0;
    const targetFPS = 30; // Reduce from 60 to 30 FPS
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        wavesInstance.render();
        lastTime = currentTime;
      }
      animationId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      wavesInstance.resize();
    };

    window.addEventListener('resize', handleResize);
    animate(0);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (holder.contains(canvas)) {
        holder.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-20 h-full w-full overflow-hidden" />;
};
