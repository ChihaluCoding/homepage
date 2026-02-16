"use client";

import { motion } from "framer-motion";
import { Heart, Github, Twitter, Youtube } from "lucide-react";

const socialLinks = [
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@%E3%81%A1%E3%81%AF%E3%82%8B21", color: "bg-red-500 hover:bg-red-600" },
  { name: "X", icon: Twitter, href: "https://x.com/ChihaluCoding", color: "bg-sky-500 hover:bg-sky-600" },
  { name: "GitHub", icon: Github, href: "https://github.com/ChihaluCoding", color: "bg-slate-700 hover:bg-slate-800" },
];

export function Footer() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden bg-gradient-to-t from-cyan-50/50 to-white">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href={baseUrl} className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center shadow-lg shadow-cyan-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-lg">
                <span className="text-slate-700">Chihalu</span>
                <span className="text-cyan-500">Studio</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              ゲーム開発者 / プログラマー / YouTuber
              <br />
              自作ゲーム・ツールの配布や活動記録を残しています。
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center text-white transition-colors shadow-md`}
                  title={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-slate-200"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-sm text-slate-400 text-center">
              © 2024 Chihalu Studio. All rights reserved.
            </p>
            <p className="text-sm text-slate-400 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> by Chihalu
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
