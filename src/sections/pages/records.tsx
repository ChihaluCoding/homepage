import React from 'react'
import ReactDOM from 'react-dom/client'
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Footer } from "@/sections/Footer";
import "@/index.css";

const growthRecords = [
  {
    id: 1,
    title: "ポートフォリオUI更新",
    description: "ヒーロー・ナビゲーション・配色を調整し、見た目の一貫性を改善。",
    image: "character.png",
  },
  {
    id: 2,
    title: "3Dアセット制作",
    description: "Blenderで配布用アセットの制作フローを整備し、試作品を作成。",
    image: "avatar.png",
  },
  {
    id: 3,
    title: "YouTube運用改善",
    description: "投稿計画を再編して、制作ログと解説動画の更新頻度を見直し。",
    image: "icon.png",
  },
  {
    id: 4,
    title: "ゲーム試作v1完成",
    description: "コア部分を実装し、テストプレイ可能な最小構成を完成。",
    image: "character.png",
  },
  {
    id: 5,
    title: "ツール機能追加",
    description: "既存ツールへ新機能を追加し、使い勝手と安定性を改善。",
    image: "avatar.png",
  },
  {
    id: 6,
    title: "サイト導線最適化",
    description: "各ページのリンク構成を整理し、情報へ到達しやすい構造に調整。",
    image: "icon.png",
  },
];

function RecordsPage() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-cyan-50/30 to-white">
        <ParticlesBackground />

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <a href={baseUrl}>
              <Button variant="ghost" className="text-slate-500 hover:text-cyan-600">
                <ChevronLeft className="w-5 h-5 mr-1" />
                ホームに戻る
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-200 mb-6">
              <BookOpen className="w-4 h-4 text-cyan-500" />
              <span className="text-sm text-cyan-600 font-medium">Growth Log</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="text-slate-700">成長</span>
              <span className="text-gradient">記録</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              制作活動の進捗をカード形式でまとめています。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {growthRecords.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.05 }}
              >
                <Card className="group bg-white border-cyan-100 overflow-hidden h-full">
                  <div className="aspect-[4/3] border-b border-cyan-100 bg-slate-50 overflow-hidden">
                    <img
                      src={`${baseUrl}${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-slate-700 mb-2">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecordsPage />
  </React.StrictMode>,
)
