"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
  color: string;
  shape: "dot" | "heart" | "star";
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      context.beginPath();
      context.moveTo(x, y + size * 0.28);
      context.bezierCurveTo(x - size, y - size * 0.35, x - size * 1.45, y + size * 0.9, x, y + size * 1.6);
      context.bezierCurveTo(x + size * 1.45, y + size * 0.9, x + size, y - size * 0.35, x, y + size * 0.28);
      context.closePath();
      context.fill();
    };

    const drawStar = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      outerRadius: number
    ) => {
      const innerRadius = outerRadius * 0.46;
      const spikes = 5;
      let rotation = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(x, y - outerRadius);

      for (let i = 0; i < spikes; i++) {
        context.lineTo(x + Math.cos(rotation) * outerRadius, y + Math.sin(rotation) * outerRadius);
        rotation += step;
        context.lineTo(x + Math.cos(rotation) * innerRadius, y + Math.sin(rotation) * innerRadius);
        rotation += step;
      }

      context.closePath();
      context.fill();
    };

    const pickShape = (): Particle["shape"] => {
      const roll = Math.random();
      if (roll < 0.58) return "dot";
      if (roll < 0.82) return "heart";
      return "star";
    };

    // Initialize particles
    const particleCount = 64;
    const colors = ["#f9a8d4", "#fbcfe8", "#c4b5fd", "#bae6fd", "#a7f3d0", "#fde68a"];
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 3,
      speedX: (Math.random() - 0.5) * 0.26,
      speedY: (Math.random() - 0.5) * 0.24,
      opacity: Math.random() * 0.3 + 0.45,
      pulse: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: pickShape(),
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.pulse += 0.02;
        particle.x += particle.speedX + Math.sin(particle.pulse * 0.8) * 0.05;
        particle.y += particle.speedY + Math.cos(particle.pulse) * 0.05;

        // Wrap around screen
        const wrapMargin = 20;
        if (particle.x < -wrapMargin) particle.x = canvas.width + wrapMargin;
        if (particle.x > canvas.width + wrapMargin) particle.x = -wrapMargin;
        if (particle.y < -wrapMargin) particle.y = canvas.height + wrapMargin;
        if (particle.y > canvas.height + wrapMargin) particle.y = -wrapMargin;

        const twinkle = 0.82 + Math.sin(particle.pulse * 1.7) * 0.18;
        const drawSize = particle.size * twinkle;

        // Soft glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, drawSize * 1.9, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity * 0.2;
        ctx.fill();

        // Foreground shape
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        if (particle.shape === "heart") {
          drawHeart(ctx, particle.x, particle.y - drawSize * 0.45, drawSize * 0.55);
        } else if (particle.shape === "star") {
          drawStar(ctx, particle.x, particle.y, drawSize * 0.75);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, drawSize * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.62 }}
    />
  );
}
