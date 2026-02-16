"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Youtube, Play, Eye, ThumbsUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// 3Dチルト効果
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  
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

// 脈動するプレイボタン
function PulsingPlayButton() {
  return (
    <motion.div
      className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg relative"
      animate={{ 
        scale: [1, 1.1, 1],
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {/* 外側のリング */}
      <motion.div
        className="absolute inset-0 rounded-full bg-red-500"
        animate={{ 
          scale: [1, 1.5, 1.5],
          opacity: [0.5, 0, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeOut" 
        }}
      />
      {/* 2番目のリング */}
      <motion.div
        className="absolute inset-0 rounded-full bg-red-400"
        animate={{ 
          scale: [1, 1.3, 1.3],
          opacity: [0.3, 0, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeOut",
          delay: 0.3
        }}
      />
      <Play className="w-6 h-6 text-white ml-1 relative z-10" />
    </motion.div>
  );
}

// アニメーションするチャンネルアイコン
function AnimatedChannelIcon({ icon, color, delay = 0 }: { icon: string; color: string; delay?: number }) {
  return (
    <motion.div
      className={`w-20 h-20 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-4xl flex-shrink-0 shadow-lg relative overflow-hidden`}
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
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.5 }
      }}
    >
      <motion.span
        animate={{ 
          y: [0, -5, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay
        }}
      >
        {icon}
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

const youtubeChannels = [
  {
    id: 1,
    name: "Chihalu Game Dev",
    description: "ゲーム開発の過程や技術解説を発信しています",
    subscribers: "1.2K",
    videos: 45,
    url: "#",
    thumbnail: "🎮",
    color: "from-red-500 to-rose-500",
  },
  {
    id: 2,
    name: "Chihalu Vlog",
    description: "日常や制作の裏側をお届けします",
    subscribers: "850",
    videos: 28,
    url: "#",
    thumbnail: "📹",
    color: "from-cyan-500 to-sky-500",
  },
];

const featuredVideos = [
  {
    id: 1,
    title: "【Unity】初心者向けゲーム制作講座 #1",
    views: "5.2K",
    likes: 320,
    duration: "15:30",
    thumbnail: "🎓",
  },
  {
    id: 2,
    title: "新作ゲーム「Pixel Adventure」紹介",
    views: "3.8K",
    likes: 245,
    duration: "8:45",
    thumbnail: "🎮",
  },
  {
    id: 3,
    title: "プログラマーの1日に密着",
    views: "2.1K",
    likes: 180,
    duration: "12:00",
    thumbnail: "📅",
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

export function YouTube() {
  return (
    <section id="youtube" className="py-24 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-200 mb-6"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-600 font-medium">YouTube</span>
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-700">おすすめ</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-rose-500">チャンネル</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            私が運営しているYouTubeチャンネルや、
            おすすめのクリエイターチャンネルを紹介します。
          </p>
        </motion.div>

        {/* My Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h3 
            className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Play className="w-5 h-5 text-red-500" />
            </motion.div>
            マイチャンネル
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {youtubeChannels.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <TiltCard>
                  <Card className="bg-white border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:shadow-red-100 overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-red-100/0 group-hover:from-red-50/50 group-hover:to-red-100/30 transition-all duration-500"
                    />
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start gap-4">
                        <AnimatedChannelIcon icon={channel.thumbnail} color={channel.color} delay={index * 0.2} />
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-2">
                            <motion.h4 
                              className="text-lg font-bold text-slate-700 group-hover:text-red-500 transition-colors"
                              whileHover={{ x: 3 }}
                            >
                              {channel.name}
                            </motion.h4>
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.3 + index * 0.1 }}
                            >
                              <Badge className="bg-red-500 text-white">
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                >
                                  <Youtube className="w-3 h-3 mr-1" />
                                </motion.div>
                                YouTube
                              </Badge>
                            </motion.div>
                          </div>
                          <p className="text-slate-500 text-sm mb-3">
                            {channel.description}
                          </p>
                          <motion.div 
                            className="flex items-center gap-4 text-sm text-slate-400"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                              hidden: {},
                              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 + index * 0.1 } }
                            }}
                          >
                            <motion.span 
                              className="flex items-center gap-1"
                              variants={{
                                hidden: { opacity: 0, x: -10 },
                                visible: { opacity: 1, x: 0 }
                              }}
                              whileHover={{ scale: 1.05, color: "#ef4444" }}
                            >
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Eye className="w-4 h-4" />
                              </motion.div>
                              {channel.subscribers} 登録者
                            </motion.span>
                            <motion.span 
                              className="flex items-center gap-1"
                              variants={{
                                hidden: { opacity: 0, x: -10 },
                                visible: { opacity: 1, x: 0 }
                              }}
                              whileHover={{ scale: 1.05, color: "#ef4444" }}
                            >
                              <Play className="w-4 h-4" />
                              {channel.videos} 本の動画
                            </motion.span>
                          </motion.div>
                        </div>
                      </div>
                      <motion.div 
                        className="mt-4 pt-4 border-t border-slate-100"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            size="sm"
                            className="w-full bg-red-500 hover:bg-red-600 text-white relative overflow-hidden group/btn"
                          >
                            <motion.span
                              className="absolute inset-0 bg-red-600"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                            <span className="relative flex items-center justify-center">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              チャンネルを見る
                            </span>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Videos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ThumbsUp className="w-5 h-5 text-cyan-500" />
            </motion.div>
            おすすめ動画
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredVideos.map((video, index) => (
              <motion.div key={video.id} variants={itemVariants}>
                <TiltCard className="h-full">
                  <Card className="group bg-white border-slate-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-100 overflow-hidden cursor-pointer h-full">
                    {/* Video Thumbnail */}
                    <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center">
                      <motion.span 
                        className="text-5xl"
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: index * 0.3
                        }}
                      >
                        {video.thumbnail}
                      </motion.span>
                      <motion.div 
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                      />
                      <motion.div 
                        className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {video.duration}
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PulsingPlayButton />
                      </motion.div>
                      {/* 光の反射 */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        initial={{ x: "-200%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </div>

                    <CardContent className="p-4">
                      <motion.h4 
                        className="font-medium text-slate-700 line-clamp-2 mb-2 group-hover:text-cyan-600 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {video.title}
                      </motion.h4>
                      <motion.div 
                        className="flex items-center gap-4 text-sm text-slate-400"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 + index * 0.1 } }
                        }}
                      >
                        <motion.span 
                          className="flex items-center gap-1"
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          whileHover={{ scale: 1.05, color: "#06b6d4" }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.div>
                          {video.views}
                        </motion.span>
                        <motion.span 
                          className="flex items-center gap-1"
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          whileHover={{ scale: 1.05, color: "#06b6d4" }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </motion.div>
                          {video.likes}
                        </motion.span>
                      </motion.div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
