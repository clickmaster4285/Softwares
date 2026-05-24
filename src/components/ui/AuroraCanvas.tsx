import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScroll;

  // simplex-ish noise
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m; m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x/uResolution.y, 1.0);

    float t = uTime * 0.08 + uScroll * 0.6;

    float n1 = snoise(p * 1.4 + vec2(t, -t * 0.5));
    float n2 = snoise(p * 2.2 + vec2(-t * 0.7, t * 0.3) + n1);
    float n3 = snoise(p * 0.8 + vec2(t * 0.4, t * 0.6));

    vec3 teal   = vec3(0.40, 0.66, 0.70);
    vec3 mint   = vec3(0.72, 0.86, 0.62);
    vec3 peach  = vec3(0.98, 0.74, 0.55);
    vec3 cream  = vec3(0.96, 0.94, 0.88);

    vec3 col = mix(cream, teal, smoothstep(-0.6, 0.8, n1));
    col = mix(col, mint, smoothstep(0.0, 1.0, n2) * 0.6);
    col = mix(col, peach, smoothstep(0.2, 1.0, n3) * 0.55);

    // soft vignette
    float v = smoothstep(1.1, 0.2, length(p));
    col *= 0.85 + 0.25 * v;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uScroll: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(mesh);

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onScroll = () => {
      uniforms.uScroll.value = window.scrollY / Math.max(1, window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      mesh.geometry.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}