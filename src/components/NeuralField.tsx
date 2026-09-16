"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "@/components/Providers";

type Shape = "orbit" | "sphere" | "wave";
type Point = { x: number; y: number; z: number; radius: number; alpha: number; light: number };
type Seed = { u: number; v: number; sx: number; sy: number; sz: number; wx: number; wz: number; phase: number };

const TAU = Math.PI * 2;

/** A tide, an orbit, and a sphere, drawn without a WebGL runtime. */
export function NeuralField({ shape }: { shape: Shape }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapeRef = useRef(shape);
  const redrawRef = useRef<(() => void) | null>(null);
  const sceneRef = useRef({ time: 0, weights: { orbit: Number(shape === "orbit"), sphere: Number(shape === "sphere"), wave: Number(shape === "wave") } });
  const { motionPaused } = useMotionPreferences();

  useEffect(() => {
    shapeRef.current = shape;
    redrawRef.current?.();
  }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const scene = sceneRef.current;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, active: false };
    let width = 0, height = 0, scale = 0, frame = 0, lastTime = 0;
    let visible = false;
    let columns = 0;
    let bounds = canvas.getBoundingClientRect();
    let glow: CanvasGradient | null = null;
    let seeds: Seed[] = [];
    let points: Point[] = [];
    let depthOrder: Point[] = [];

    const configureParticles = () => {
      const compact = window.matchMedia("(max-width: 760px)").matches;
      const nextColumns = compact ? 40 : 58;
      if (columns === nextColumns) return;
      columns = nextColumns;
      const rows = compact ? 26 : 36;
      const count = columns * rows;
      seeds = Array.from({ length: count }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const u = index / count * TAU;
        const v = index * golden;
        const sphereY = 1 - index / (count - 1) * 2;
        const sphereR = Math.sqrt(1 - sphereY * sphereY);
        return {
          u, v,
          sx: Math.cos(v) * sphereR,
          sy: sphereY,
          sz: Math.sin(v) * sphereR,
          wx: (column / (columns - 1) - 0.5) * 3.1,
          wz: (row / (rows - 1) - 0.5) * 2.05,
          phase: column / columns + row * 0.012,
        };
      });
      // Reuse these objects on every frame, including the depth-sorted view.
      points = seeds.map(() => ({ x: 0, y: 0, z: 0, radius: 0, alpha: 0, light: 0 }));
      depthOrder = [...points];
    };

    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || !width || !height) return;
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.04) : 0;
      lastTime = now;
      if (!motionPaused) scene.time += delta;
      const time = scene.time;
      const follow = motionPaused ? 1 : 1 - Math.exp(-delta * 4.5);
      pointer.x += (pointer.targetX - pointer.x) * follow;
      pointer.y += (pointer.targetY - pointer.y) * follow;
      pointer.strength += ((pointer.active && !motionPaused ? 1 : 0) - pointer.strength) * follow;
      const morphSpeed = motionPaused ? 1 : 1 - Math.exp(-delta * 3.6);
      for (const key of ["orbit", "sphere", "wave"] as const) {
        scene.weights[key] += (Number(shapeRef.current === key) - scene.weights[key]) * morphSpeed;
      }
      const { orbit, sphere, wave } = scene.weights;

      context.clearRect(0, 0, width, height);
      if (glow) {
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
      }

      const rotationY = 0.13 + Math.sin(time * 0.13) * 0.25 + pointer.x * 0.35;
      const rotationX = 0.56 + wave * 0.17 + Math.sin(time * 0.18) * 0.055 + pointer.y * 0.22;
      const rotationZ = (-0.45 + Math.sin(time * 0.09) * 0.15) * (1 - wave) - wave * 0.12;
      const cy = Math.cos(rotationY), sy = Math.sin(rotationY);
      const cx = Math.cos(rotationX), sx = Math.sin(rotationX);
      const cz = Math.cos(rotationZ), sz = Math.sin(rotationZ);
      const pointerX = (pointer.x + 0.5) * width;
      const pointerY = (pointer.y + 0.5) * height;
      const reachSquared = (scale * 0.65) ** 2;
      const size = Math.min(width / 560, 1.1);

      for (let index = 0; index < seeds.length; index++) {
        const seed = seeds[index];
        const tube = 0.35 + Math.sin(seed.u * 5 + time * 0.65) * 0.035;
        const ring = 0.91 + tube * Math.cos(seed.v);
        const waveY = Math.sin(seed.wx * 2.2 + seed.wz * 1.4 - time * 0.78) * 0.23
          + Math.cos(seed.wz * 3.5 - seed.wx * 0.6 + time * 0.52) * 0.105;
        const rippleDistance = Math.hypot(seed.wx - pointer.x * 3, seed.wz - pointer.y * 2);
        const ripple = Math.sin(rippleDistance * 7 - time * 2.2) * Math.exp(-rippleDistance * 1.6) * pointer.strength * 0.13;
        let x = ring * Math.cos(seed.u) * orbit + seed.sx * 1.16 * sphere + seed.wx * wave;
        let y = ring * Math.sin(seed.u) * orbit + seed.sy * 1.16 * sphere + (waveY + ripple) * wave;
        let z = (tube * Math.sin(seed.v) + Math.sin(seed.u * 3 + time * 0.3) * 0.07) * orbit
          + seed.sz * 1.16 * sphere + seed.wz * wave;
        const xx = x * cy + z * sy;
        z = -x * sy + z * cy;
        x = xx;
        const yy = y * cx - z * sx;
        z = y * sx + z * cx;
        y = yy;
        const rx = x * cz - y * sz;
        y = x * sz + y * cz;
        x = rx;

        const perspective = 4.5 / (4.5 - z);
        const depth = Math.max(0, Math.min(1, (z + 1.4) / 2.8));
        const point = points[index];
        point.x = width / 2 + x * scale * perspective;
        point.y = height * 0.49 + y * scale * perspective;
        point.z = z;
        const dx = point.x - pointerX;
        const dy = point.y - pointerY;
        const proximity = Math.max(0, 1 - (dx * dx + dy * dy) / reachSquared) ** 2 * pointer.strength;
        point.x += dx * proximity * 0.075;
        point.y += dy * proximity * 0.075;
        // A narrow band of light travels through the water and around the forms.
        const current = Math.max(0, 1 - Math.abs(Math.sin((seed.phase - time * 0.1) * Math.PI)) * 13);
        point.light = Math.min(1, current * 0.8 + proximity * 0.65);
        point.radius = Math.max(0.45, (0.58 + depth * 1.05 + point.light * 0.6) * size);
        point.alpha = Math.min(1, 0.17 + depth * 0.62 + point.light * 0.32);
      }

      // Sparse short threads expose the tide's surface without a dense wire mesh.
      if (wave > 0.015) {
        context.lineWidth = 0.65;
        const maxDistanceSquared = (scale * 0.2) ** 2;
        for (let index = 0; index < points.length - 1; index += 3) {
          if (index % columns === columns - 1 || Math.floor(index / columns) % 4 !== 0) continue;
          const point = points[index];
          const next = points[index + 1];
          const distanceSquared = (point.x - next.x) ** 2 + (point.y - next.y) ** 2;
          if (distanceSquared > maxDistanceSquared) continue;
          context.strokeStyle = `rgba(255,140,84,${wave * (0.08 + point.light * 0.22)})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(next.x, next.y);
          context.stroke();
        }
      }

      depthOrder.sort((a, b) => a.z - b.z);
      for (let index = 0; index < depthOrder.length; index++) {
        const point = depthOrder[index];
        if (point.light > 0.68 && index % 11 === 0) {
          context.fillStyle = `rgba(255,128,64,${point.light * 0.085})`;
          context.beginPath();
          context.arc(point.x, point.y, point.radius * 3.6, 0, TAU);
          context.fill();
        }
        const green = Math.round(106 + Math.max(0, point.z) * 31 + point.light * 60);
        context.fillStyle = `rgba(255,${green},${Math.round(53 + point.light * 74)},${point.alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, TAU);
        context.fill();
      }
      if (!motionPaused) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame || !visible || document.hidden) return;
      lastTime = 0;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    };
    const measureBounds = () => { bounds = canvas.getBoundingClientRect(); };
    redrawRef.current = start;

    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      // Leave breathing room around the broad tide, including narrow screens.
      scale = Math.min(width * 0.285, height * 0.32);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      configureParticles();
      measureBounds();
      glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(1, scale * 1.9));
      glow.addColorStop(0, "rgba(255,88,35,0.07)");
      glow.addColorStop(0.55, "rgba(255,88,35,0.025)");
      glow.addColorStop(1, "rgba(255,88,35,0)");
      start();
    });
    resize.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const enter = (event: PointerEvent) => {
      if (motionPaused || event.pointerType === "touch") return;
      measureBounds();
      pointer.active = true;
    };
    const move = (event: PointerEvent) => {
      if (motionPaused || event.pointerType === "touch" || !bounds.width || !bounds.height) return;
      pointer.active = true;
      pointer.targetX = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
      pointer.targetY = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    };
    const leave = () => { pointer.active = false; pointer.targetX = 0; pointer.targetY = 0; };
    const onScroll = () => { if (pointer.active) measureBounds(); };
    canvas.addEventListener("pointerenter", enter, { passive: true });
    canvas.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("pointercancel", leave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      redrawRef.current = null;
      resize.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointerenter", enter);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointercancel", leave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [motionPaused]);

  const label = shape === "wave"
    ? "Orange particle tide inspired by Victoria Harbour and the Pearl River"
    : `Orange particle ${shape}`;
  return <canvas ref={canvasRef} aria-label={label} role="img" style={{ width: "100%", height: "100%", display: "block" }} />;
}
