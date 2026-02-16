import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { motion } from "framer-motion";
import { Sparkles, Youtube, Twitter, Github, ChevronRight, MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Navigation } from "@/components/Navigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Footer } from "@/sections/Footer";
import "@/index.css";

const baseUrl = import.meta.env.BASE_URL || "/";
const youtubeChannelUrl = "https://www.youtube.com/@%E3%81%A1%E3%81%AF%E3%82%8B21";

const profileSocialLinks = [
  { name: "YouTube", icon: Youtube, href: youtubeChannelUrl, color: "from-red-500 to-rose-500" },
  { name: "X", icon: Twitter, href: "https://x.com/ChihaluCoding", color: "from-sky-400 to-blue-500" },
  { name: "GitHub", icon: Github, href: "https://github.com/ChihaluCoding", color: "from-slate-500 to-slate-700" },
];

function HomePage() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <ParticlesBackground />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative w-[22rem] h-[30rem] lg:w-[30rem] lg:h-[42rem]">
                <img
                  src={`${baseUrl}character.png`}
                  alt="Character"
                  className="relative z-10 w-full h-full object-contain"
                />

                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute z-0 w-2 h-2 bg-cyan-400 rounded-full"
                    style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
                    animate={{
                      y: [-20, -40, -20],
                      opacity: [0.4, 0.9, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl space-y-6"
            >
              <div className="relative overflow-hidden rounded-[28px] border border-cyan-100/80 bg-white p-6 sm:p-9 lg:p-12 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative flex items-center justify-center mb-6"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-sky-100 border border-cyan-200/80">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm text-cyan-700 font-semibold tracking-wide">Welcome to my page!</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.05] break-words"
                >
                  <span className="text-slate-700">Chihalu</span>
                  <span className="block sm:inline bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent sm:ml-1">
                    Studio
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative text-xl text-slate-500 mb-9 leading-relaxed"
                >
                  自作ゲーム・ツール等の販売や活動記録を残しています。
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                >
                  <a href={`${baseUrl}records/`}>
                    <Button
                      size="lg"
                      className="rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-white hover:from-cyan-600 hover:to-sky-600"
                    >
                      記録を見る
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  </a>
                  <a href={`${baseUrl}works/`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-cyan-200 bg-white/80 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300"
                    >
                      作品を見る
                    </Button>
                  </a>
                </motion.div>
              </div>

              <Card className="bg-white border-cyan-100 overflow-hidden rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 p-1">
                        <button
                          type="button"
                          onClick={() => setIsAvatarOpen(true)}
                          className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden cursor-zoom-in"
                          aria-label="アバターを拡大"
                        >
                          <img src={`${baseUrl}avatar.png`} alt="Avatar" className="w-full h-full object-cover" />
                        </button>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-700">Chihalu</h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span>Japan</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                        <CalendarDays className="w-4 h-4" />
                        <span>2004年3月14日</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-500 leading-relaxed mb-6">
                    こんにちは！Chihaluです。独学でプログラミング/3Dモデリングを始めました。 よろしくお願いします！
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {profileSocialLinks.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${link.color} text-white text-sm font-medium`}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.name}
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
        <DialogContent className="w-fit max-w-[92vw] border-cyan-100 bg-white p-3">
          <DialogTitle className="sr-only">Avatar Preview</DialogTitle>
          <img
            src={`${baseUrl}avatar.png`}
            alt="Avatar enlarged"
            className="max-h-[80vh] w-auto rounded-xl object-contain"
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
)
