"use client";

import { useEffect, useRef } from "react";

// 🌸 パーティクルネットワーク背景
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    // パステルカラー
    const colors = [
      "rgba(244, 114, 182, 0.6)", // pink-400
      "rgba(167, 139, 250, 0.6)", // purple-400
      "rgba(96, 165, 250, 0.5)",  // blue-400
      "rgba(244, 63, 94, 0.5)",   // rose-400
      "rgba(251, 191, 36, 0.5)",  // amber-400
    ];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        // 画面端でバウンス
        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const drawConnections = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(244, 114, 182, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // パーティクル更新と描画
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // 線で繋ぐ
      drawConnections();

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}

// 💫 きらきら星（少しだけ残す）
function TwinklingStars() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4 + Math.random() * 6,
            height: 4 + Math.random() * 6,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" fill="#FCD34D">
            <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.14L12 16.18L7.18 19.14L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// 🎨 ふんわり背景の色塊
function SoftBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-pink-200/30 to-rose-200/20 rounded-full animate-blob"
        style={{ filter: "blur(80px)" }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full"
        style={{
          filter: "blur(80px)",
          animation: "blob 12s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full"
        style={{
          filter: "blur(80px)",
          animation: "blob 15s ease-in-out infinite 2s",
        }}
      />
    </div>
  );
}

// モーションコンポーネントのimportを追加
import { motion } from "framer-motion";

export function CuteBackground() {
  return (
    <>
      <SoftBlobs />
      <ParticleNetwork />
      <TwinklingStars />
    </>
  );
}
