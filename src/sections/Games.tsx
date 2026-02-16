"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Gamepad2, Download, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// カウントアップアニメーションコンポーネント
function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{count.toLocaleString()}</span>;
}

const games = [
  {
    id: 1,
    title: "Pixel Adventure",
    description: "レトロ風ピクセルアートの2Dアクションゲーム。様々なステージを冒険しよう！",
    category: "Action",
    rating: 4.8,
    downloads: 1250,
    image: "🎮",
    tags: ["2D", "Pixel Art", "Platformer"],
    color: "from-purple-400 to-pink-400",
  },
  {
    id: 2,
    title: "Space Shooter X",
    description: "宇宙を舞台にしたシューティングゲーム。迫りくる敵を撃ち落とせ！",
    category: "Shooter",
    rating: 4.6,
    downloads: 890,
    image: "🚀",
    tags: ["Shooting", "Space", "Bullet Hell"],
    color: "from-cyan-400 to-blue-400",
  },
  {
    id: 3,
    title: "Puzzle Master",
    description: "脳を鍛えるパズルゲーム集。論理的思考で難問を解き明かせ！",
    category: "Puzzle",
    rating: 4.9,
    downloads: 2100,
    image: "🧩",
    tags: ["Puzzle", "Logic", "Brain Training"],
    color: "from-emerald-400 to-teal-400",
  },
  {
    id: 4,
    title: "RPG Quest",
    description: "ファンタジー世界を舞台にした王道RPG。勇者となって世界を救え！",
    category: "RPG",
    rating: 4.7,
    downloads: 1560,
    image: "⚔️",
    tags: ["RPG", "Fantasy", "Story"],
    color: "from-amber-400 to-orange-400",
  },
  {
    id: 5,
    title: "Rhythm Beat",
    description: "音楽に合わせてリズムを刻む音ゲー。豊富な楽曲で遊ぼう！",
    category: "Rhythm",
    rating: 4.5,
    downloads: 720,
    image: "🎵",
    tags: ["Rhythm", "Music", "Casual"],
    color: "from-rose-400 to-red-400",
  },
  {
    id: 6,
    title: "Tower Defense",
    description: "戦略的なタワーディフェンスゲーム。敵の侵攻を防ぎきれ！",
    category: "Strategy",
    rating: 4.4,
    downloads: 980,
    image: "🏰",
    tags: ["Strategy", "Tower Defense", "Tactical"],
    color: "from-indigo-400 to-violet-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// 3Dカードコンポーネント
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);
  
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }
  
  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export function Games() {
  return (
    <section id="games" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-cyan-50/30 to-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-200 mb-6"
          >
            <Gamepad2 className="w-4 h-4 text-cyan-500" />
            <span className="text-sm text-cyan-600 font-medium">Games</span>
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-700">制作</span>
            <span className="text-gradient">ゲーム</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            私が制作したゲーム作品です。
            無料でダウンロードして遊べます。
          </p>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {games.map((game, index) => (
            <motion.div key={game.id} variants={itemVariants}>
              <TiltCard className="h-full">
                <Card className="group bg-white border-slate-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-100 overflow-hidden h-full">
                  {/* Game Image/Icon */}
                  <div className={`h-40 bg-gradient-to-br ${game.color} relative overflow-hidden`}>
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 3 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-6xl drop-shadow-lg">{game.image}</span>
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 bg-black/10"
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-3 right-3">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <Badge variant="secondary" className="bg-white/80 text-slate-700 backdrop-blur-sm">
                          {game.category}
                        </Badge>
                      </motion.div>
                    </div>
                    {/* 光の反射効果 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      initial={{ x: "-200%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <CardTitle className="text-xl text-slate-700 group-hover:text-cyan-600 transition-colors">
                        {game.title}
                      </CardTitle>
                    </motion.div>
                    <CardDescription className="line-clamp-2 text-slate-500">
                      {game.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.05 } }
                      }}
                    >
                      {game.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 }
                          }}
                          transition={{ delay: tagIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <Badge
                            variant="outline"
                            className="text-xs border-cyan-200 text-cyan-600 hover:bg-cyan-50 cursor-default"
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        </motion.div>
                        <span>{game.rating}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: index * 0.1 }}
                        >
                          <Download className="w-4 h-4 text-cyan-500" />
                        </motion.div>
                        <CountUp end={game.downloads} duration={2} />
                      </motion.div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        className="bg-cyan-100 text-cyan-600 hover:bg-cyan-500 hover:text-white transition-all"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        詳細
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-cyan-300 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-400 group relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-cyan-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                </motion.div>
                すべてのゲームを見る
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
