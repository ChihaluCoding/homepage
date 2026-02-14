"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Package, User, Home, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const baseUrl = import.meta.env.BASE_URL || "/";

const navItems = [
  { name: "ホーム", href: baseUrl, icon: Home },
  { name: "YouTube", href: `${baseUrl}youtube/`, icon: Youtube },
  { name: "SHOP", href: `${baseUrl}works/`, icon: Package },
  { name: "About", href: `${baseUrl}about/`, icon: User },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-cyan-200/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <motion.a
              href="/"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src="/icon.png" 
                alt="Chihalu Studio" 
                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-cyan-200"
              />
              <span className="font-bold text-lg hidden sm:block">
                <span className="text-slate-700">Chihalu</span>
                <span className="text-cyan-500">Studio</span>
              </span>
            </motion.a>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.a>
              ))}
            </nav>



            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-cyan-100 text-cyan-600"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-white/98 backdrop-blur-xl" />
            <nav className="relative flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-2xl font-medium text-slate-500 hover:text-cyan-600 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-cyan-500" />
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
