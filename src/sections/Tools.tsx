"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Wrench, Download, ExternalLink, Zap, Check, Sparkles } from "lucide-react";
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

// カウントアップアニメーション
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

// 3Dチルトカード
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  
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
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(34, 211, 238, 0.15), transparent 50%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// アイコンアニメーション
function AnimatedIcon({ icon, color, delay = 0 }: { icon: string; color: string; delay?: number }) {
  return (
    <motion.div
      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl shadow-lg relative overflow-hidden`}
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay 
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.5 }
      }}
    >
      <motion.span
        animate={{ 
          y: [0, -3, 0],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay * 2
        }}
      >
        {icon}
      </motion.span>
      {/* 光のエフェクト */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}

// NEWバッジのパルスアニメーション
function NewBadge() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
    >
      <Badge className="bg-cyan-500 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-white/30"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <Zap className="w-3 h-3 mr-1 relative z-10" />
        </motion.div>
        <span className="relative z-10">NEW</span>
      </Badge>
    </motion.div>
  );
}

const tools = [
  {
    id: 1,
    title: "Image Converter",
    description: "様々な画像フォーマットを簡単に変換できるツール。バッチ処理にも対応。",
    category: "Utility",
    downloads: 3200,
    icon: "🖼️",
    features: ["Batch Convert", "20+ Formats", "Resize"],
    color: "from-emerald-400 to-teal-400",
    isNew: false,
  },
  {
    id: 2,
    title: "Text Editor Pro",
    description: "シンプルかつ高機能なテキストエディタ。プログラミングにも最適。",
    category: "Productivity",
    downloads: 1850,
    icon: "📝",
    features: ["Syntax Highlight", "Auto Save", "Plugins"],
    color: "from-blue-400 to-indigo-400",
    isNew: true,
  },
  {
    id: 3,
    title: "File Organizer",
    description: "ファイルを自動で整理・分類してくれる便利ツール。",
    category: "Utility",
    downloads: 980,
    icon: "📁",
    features: ["Auto Sort", "Duplicate Detection", "Rules"],
    color: "from-amber-400 to-yellow-400",
    isNew: false,
  },
  {
    id: 4,
    title: "Color Picker",
    description: "画面から色を抽出し、パレットを作成できるデザイナー向けツール。",
    category: "Design",
    downloads: 2450,
    icon: "🎨",
    features: ["Screen Pick", "Palette Export", "Harmony"],
    color: "from-pink-400 to-rose-400",
    isNew: false,
  },
  {
    id: 5,
    title: "Password Manager",
    description: "安全にパスワードを管理できるローカル型パスワードマネージャー。",
    category: "Security",
    downloads: 1120,
    icon: "🔐",
    features: ["Encryption", "Generator", "Auto Fill"],
    color: "from-violet-400 to-purple-400",
    isNew: true,
  },
  {
    id: 6,
    title: "System Monitor",
    description: "PCのパフォーマンスをリアルタイムで監視できるツール。",
    category: "System",
    downloads: 780,
    icon: "📊",
    features: ["CPU/GPU/RAM", "Temperature", "Alerts"],
    color: "from-cyan-400 to-sky-400",
    isNew: false,
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

export function Tools() {
  return (
    <section id="tools" className="py-24 relative overflow-hidden bg-white">
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
            <Wrench className="w-4 h-4 text-cyan-500" />
            <span className="text-sm text-cyan-600 font-medium">Tools</span>
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-700">制作</span>
            <span className="text-gradient">ツール</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            日常の作業を効率化するツールを制作・配布しています。
            すべて無料でご利用いただけます。
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool, index) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <TiltCard className="h-full group">
                <Card className="bg-white border-slate-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-100 h-full flex flex-col relative overflow-hidden">
                  {/* 背景の輝き */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-cyan-100/0 group-hover:from-cyan-50/50 group-hover:to-cyan-100/30 transition-all duration-500"
                  />
                  
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <AnimatedIcon icon={tool.icon} color={tool.color} delay={index * 0.1} />
                      <div className="flex flex-col items-end gap-2">
                        {tool.isNew && <NewBadge />}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Badge variant="outline" className="border-slate-200 text-slate-500">
                            {tool.category}
                          </Badge>
                        </motion.div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <CardTitle className="text-xl text-slate-700 group-hover:text-cyan-600 transition-colors">
                        {tool.title}
                      </CardTitle>
                    </motion.div>
                    <CardDescription className="text-slate-500">{tool.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pb-3 flex-grow relative z-10">
                    <motion.div 
                      className="space-y-2"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 + index * 0.1 } }
                      }}
                    >
                      {tool.features.map((feature) => (
                        <motion.div 
                          key={feature} 
                          className="flex items-center gap-2 text-sm text-slate-500"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          whileHover={{ x: 5, color: "#0891b2" }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            <Check className="w-4 h-4 text-cyan-500" />
                          </motion.div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between pt-3 border-t border-slate-100 relative z-10">
                    <motion.div 
                      className="flex items-center gap-1 text-sm text-slate-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                      >
                        <Download className="w-4 h-4 text-cyan-500" />
                      </motion.div>
                      <CountUp end={tool.downloads} duration={2} />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        className="bg-cyan-100 text-cyan-600 hover:bg-cyan-500 hover:text-white transition-all relative overflow-hidden group/btn"
                      >
                        <motion.span
                          className="absolute inset-0 bg-cyan-500"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          ダウンロード
                        </span>
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
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Wrench className="w-5 h-5 mr-2" />
                </motion.div>
                すべてのツールを見る
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
