"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "@/components/Providers";

type Point = { x: number; y: number; z: number; radius: number; alpha: number };

/** A projected particle sculpture without a WebGL runtime or external assets. */
export function NeuralField({ shape }: { shape: "orbit" | "sphere" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapeRef = useRef(shape);
  const redrawRef = useRef<(() => void) | null>(null);
  const { motionPaused } = useMotionPreferences();

  useEffect(() => { shapeRef.current = shape; redrawRef.current?.(); }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    let width = 0, height = 0, frame = 0, time = 0, lastTime = 0;
    let visible = true;
    let morph = shapeRef.current === "sphere" ? 1 : 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const count = window.matchMedia("(max-width: 640px)").matches ? 1800 : 3200;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const seeds = Array.from({ length: count }, (_, i) => {
      const u = (i / count) * Math.PI * 2;
      const v = i * golden;
      const sphereY = 1 - (i / (count - 1)) * 2;
      const sphereR = Math.sqrt(1 - sphereY * sphereY);
      return { u, v, sx: Math.cos(v) * sphereR, sy: sphereY, sz: Math.sin(v) * sphereR };
    });
    const draw = (now: number) => {
      frame = 0;
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.04) : 0;
      lastTime = now;
      if (!motionPaused) time += delta;
      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;
      const targetMorph = shapeRef.current === "sphere" ? 1 : 0;
      morph = motionPaused ? targetMorph : morph + (targetMorph - morph) * 0.045;
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;
      const scale = Math.min(width, height) * 0.32;
      const rotationY = 0.15 + Math.sin(time * 0.16) * 0.45 + pointer.x * 0.65;
      const rotationX = 0.58 + Math.sin(time * 0.2) * 0.1 + pointer.y * 0.32;
      const rotationZ = -0.52 + time * 0.035;
      const cy = Math.cos(rotationY), sy = Math.sin(rotationY);
      const cx = Math.cos(rotationX), sx = Math.sin(rotationX);
      const cz = Math.cos(rotationZ), sz = Math.sin(rotationZ);
      const glow = context.createRadialGradient(width / 2, height / 2, scale * 0.15, width / 2, height / 2, scale * 1.65);
      glow.addColorStop(0, "rgba(255,88,35,0.065)");
      glow.addColorStop(0.65, "rgba(255,88,35,0.025)");
      glow.addColorStop(1, "rgba(255,88,35,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      const projected: Point[] = [];
      for (const seed of seeds) {
        const pulse = Math.sin(seed.u * 5 + time * 0.6) * 0.035;
        const tube = 0.37 + pulse;
        const ring = 0.91 + tube * Math.cos(seed.v);
        const tx = ring * Math.cos(seed.u);
        const ty = ring * Math.sin(seed.u);
        const tz = tube * Math.sin(seed.v) + Math.sin(seed.u * 3 + time * 0.3) * 0.07;
        let x = tx * (1 - morph) + seed.sx * 1.16 * morph;
        let y = ty * (1 - morph) + seed.sy * 1.16 * morph;
        let z = tz * (1 - morph) + seed.sz * 1.16 * morph;
        const xx = x * cy + z * sy;
        z = -x * sy + z * cy;
        x = xx;
        const yy = y * cx - z * sx;
        z = y * sx + z * cx;
        y = yy;
        const rx = x * cz - y * sz;
        y = x * sz + y * cz;
        x = rx;
        const perspective = 3.8 / (3.8 - z);
        const depth = Math.max(0, Math.min(1, (z + 1.4) / 2.8));
        projected.push({ x: width / 2 + x * scale * perspective, y: height / 2 + y * scale * perspective, z, radius: (0.55 + depth * 1.25) * Math.min(width / 560, 1.15), alpha: 0.15 + depth * 0.82 });
      }
      projected.sort((a, b) => a.z - b.z);
      for (const point of projected) {
        context.fillStyle = point.z > 0.5 ? `rgba(255,${Math.round(133 + point.z * 32)},89,${point.alpha})` : `rgba(255,99,44,${point.alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, Math.max(0.4, point.radius), 0, Math.PI * 2);
        context.fill();
      }
      if (!motionPaused && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const start = () => {
      if (frame) cancelAnimationFrame(frame);
      lastTime = 0;
      frame = requestAnimationFrame(draw);
    };
    redrawRef.current = start;
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      start();
    });
    resize.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    intersection.observe(canvas);
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else if (visible) start();
    };
    const move = (event: PointerEvent) => {
      if (motionPaused || event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = (event.clientX - rect.left) / width - 0.5;
      pointer.targetY = (event.clientY - rect.top) / height - 0.5;
    };
    const leave = () => { pointer.targetX = 0; pointer.targetY = 0; };
    canvas.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      redrawRef.current = null;
      resize.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [motionPaused]);
  return <canvas ref={canvasRef} aria-label={`Interactive orange particle ${shape}`} role="img" style={{ width: "100%", height: "100%", display: "block" }} />;
}
