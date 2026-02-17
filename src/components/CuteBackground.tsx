"use client";

import { useEffect, useRef } from "react";

// 🌸 絵文字パーティクルネットワーク
function EmojiParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<EmojiParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  class EmojiParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    emoji: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
    pulse: number;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      
      // 可愛い絵文字
      const emojis = ["💖", "💕", "✨", "🌸", "⭐", "💗", "🎀", "💝", "🌟", "💓"];
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      this.size = Math.random() * 8 + 12; // 大きめに
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update(canvasWidth: number, canvasHeight: number, mouseX: number, mouseY: number) {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.pulse += 0.05;

      // マウスに少し引かれる
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        this.x += dx * 0.001;
        this.y += dy * 0.001;
      }

      // 画面端でバウンス
      if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
      if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      
      // パルス効果
      const scale = 1 + Math.sin(this.pulse) * 0.15;
      ctx.scale(scale, scale);
      ctx.rotate(this.rotation);
      
      ctx.font = `${this.size}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.emoji, 0, 0);
      
      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new EmojiParticle(canvas.width, canvas.height));
      }
    };

    const drawConnections = () => {
      const maxDistance = 200;
      const particles = particlesRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(244, 114, 182, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 5]); // 点線
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 接続線を先に描画
      drawConnections();

      // パーティクル更新と描画
      particlesRef.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height, mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}

// 🎨 ふんわり背景の色塊
function SoftBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-pink-200/25 to-rose-200/15 rounded-full"
        style={{ filter: "blur(80px)", animation: "blob 15s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/25 to-pink-200/15 rounded-full"
        style={{ filter: "blur(80px)", animation: "blob 18s ease-in-out infinite reverse" }}
      />
    </div>
  );
}

export function CuteBackground() {
  return (
    <>
      <SoftBlobs />
      <EmojiParticleNetwork />
    </>
  );
}
