"use client";

import { motion } from "framer-motion";

// 💫 きらきら星
function TwinklingStars() {
  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 1 + Math.random() * 2,
    size: 4 + Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" fill="url(#star-gradient)">
            <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.14L12 16.18L7.18 19.14L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" />
            <defs>
              <linearGradient id="star-gradient" x1="0" y1="0" x2="24" y2="24">
                <stop stopColor="#FCD34D" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// 🎨 ふんわり背景の色塊（ブロブ）
function SoftBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* ピンクの塊 */}
      <motion.div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-gradient-to-br from-pink-200/50 to-rose-200/40 animate-blob"
        style={{ filter: "blur(80px)" }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/50 to-pink-200/40"
        style={{
          filter: "blur(80px)",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-gradient-to-br from-indigo-200/40 to-purple-200/40"
        style={{
          filter: "blur(80px)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-gradient-to-br from-rose-200/40 to-pink-200/40"
        style={{
          filter: "blur(60px)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-20 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-fuchsia-200/35 to-pink-200/35"
        style={{
          filter: "blur(50px)",
          borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
        }}
        animate={{
          scale: [1, 1.1, 1],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      {/* 追加のブロブ */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-blue-200/30"
        style={{
          filter: "blur(70px)",
          borderRadius: "40% 60% 50% 50% / 50% 40% 60% 50%",
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -25, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

// 💖 ふわふわ浮かぶハート
function FloatingHearts() {
  const hearts = [
    { emoji: "💖", left: "5%", delay: 0, duration: 12, size: 24 },
    { emoji: "💕", left: "15%", delay: 2, duration: 15, size: 20 },
    { emoji: "💗", left: "25%", delay: 4, duration: 13, size: 22 },
    { emoji: "💓", left: "35%", delay: 1, duration: 14, size: 18 },
    { emoji: "💝", left: "45%", delay: 3, duration: 16, size: 24 },
    { emoji: "💖", left: "55%", delay: 5, duration: 11, size: 20 },
    { emoji: "💕", left: "65%", delay: 0.5, duration: 17, size: 22 },
    { emoji: "💗", left: "75%", delay: 2.5, duration: 13, size: 18 },
    { emoji: "💖", left: "85%", delay: 4.5, duration: 15, size: 26 },
    { emoji: "💓", left: "95%", delay: 1.5, duration: 14, size: 20 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: heart.left,
            fontSize: heart.size,
            top: "-50px",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(index) * 40, 0],
            rotate: [0, 20, -20, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// 🌸 ふわふわ浮かぶ花とかわいいもの
function FloatingPetals() {
  const petals = [
    { emoji: "🌸", delay: 0, duration: 18, left: "8%", size: 28 },
    { emoji: "🌺", delay: 2.5, duration: 20, left: "18%", size: 24 },
    { emoji: "🌷", delay: 4.5, duration: 22, left: "28%", size: 26 },
    { emoji: "🌸", delay: 1.5, duration: 19, left: "38%", size: 22 },
    { emoji: "💮", delay: 3.5, duration: 21, left: "48%", size: 28 },
    { emoji: "🌺", delay: 5.5, duration: 17, left: "58%", size: 24 },
    { emoji: "🌹", delay: 0.8, duration: 20, left: "68%", size: 26 },
    { emoji: "🌻", delay: 2.8, duration: 18, left: "78%", size: 30 },
    { emoji: "🌼", delay: 4.8, duration: 23, left: "88%", size: 22 },
    { emoji: "🌸", delay: 6, duration: 19, left: "93%", size: 24 },
    { emoji: "✨", delay: 1, duration: 10, left: "12%", size: 18 },
    { emoji: "⭐", delay: 3, duration: 12, left: "32%", size: 20 },
    { emoji: "✨", delay: 5, duration: 11, left: "52%", size: 18 },
    { emoji: "🌟", delay: 2, duration: 13, left: "72%", size: 22 },
    { emoji: "✨", delay: 4, duration: 10, left: "92%", size: 16 },
    { emoji: "🎀", delay: 1.2, duration: 16, left: "22%", size: 24 },
    { emoji: "🧸", delay: 3.2, duration: 25, left: "42%", size: 26 },
    { emoji: "🎈", delay: 5.2, duration: 20, left: "62%", size: 28 },
    { emoji: "🍬", delay: 2.2, duration: 18, left: "82%", size: 22 },
    { emoji: "🧁", delay: 4.2, duration: 22, left: "15%", size: 24 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: petal.left,
            fontSize: petal.size,
            top: "-60px",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(index) * 50, 0],
            rotate: [0, 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {petal.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// 🎈 ぷかぷか浮かぶバルーン
function FloatingBalloons() {
  const balloons = [
    { color: "#F472B6", left: "10%", delay: 0, size: 40 },
    { color: "#A78BFA", left: "30%", delay: 3, size: 35 },
    { color: "#60A5FA", left: "50%", delay: 6, size: 45 },
    { color: "#34D399", left: "70%", delay: 1.5, size: 38 },
    { color: "#FBBF24", left: "90%", delay: 4.5, size: 42 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((balloon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: balloon.left,
            bottom: "-60px",
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(index) * 80, 0],
          }}
          transition={{
            duration: 20 + index * 2,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="rounded-full shadow-lg"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
              background: `radial-gradient(circle at 30% 30%, white 0%, ${balloon.color} 50%, ${balloon.color}dd 100%)`,
            }}
          />
          {/* 紐 */}
          <motion.div
            className="w-0.5 h-20 mx-auto origin-top"
            style={{ background: balloon.color }}
            animate={{
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// 🌈 虹色の光の筋
function RainbowLight() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute top-0 left-0 w-full h-1 opacity-50"
        style={{
          background:
            "linear-gradient(90deg, #F472B6, #A78BFA, #60A5FA, #34D399, #FBBF24, #F472B6)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function CuteBackground() {
  return (
    <>
      <SoftBlobs />
      <TwinklingStars />
      <FloatingHearts />
      <FloatingPetals />
      <FloatingBalloons />
      <RainbowLight />
    </>
  );
}
