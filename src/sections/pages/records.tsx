import React from 'react'
import ReactDOM from 'react-dom/client'
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, ChevronLeft, Rocket, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Footer } from "@/sections/Footer";
import "@/index.css";

const milestones = [
  {
    id: 1,
    date: "2026-02-01",
    title: "ポートフォリオ再設計",
    description: "トップページの構成を見直し、導線とデザインの統一感を改善しました。",
    tag: "Website",
    status: "done",
  },
  {
    id: 2,
    date: "2026-01-20",
    title: "3Dアセット制作開始",
    description: "Blenderで配布向け3Dモデルの量産フローを構築しました。",
    tag: "3D",
    status: "done",
  },
  {
    id: 3,
    date: "2025-12-30",
    title: "YouTube投稿ペース改善",
    description: "月1本から月2本に更新頻度を引き上げる運用を開始しました。",
    tag: "YouTube",
    status: "done",
  },
  {
    id: 4,
    date: "2025-12-01",
    title: "新作ゲームのプロトタイプ完成",
    description: "コアシステムとUIの試作が完了し、テスト配布を準備中です。",
    tag: "Game",
    status: "in-progress",
  },
];

const goals = [
  { title: "年間公開作品", value: "12", note: "ゲーム / ツール / アセット" },
  { title: "YouTube投稿本数", value: "24", note: "月2本ペース" },
  { title: "学習時間", value: "500h", note: "Blender / Unity / React" },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

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
              制作活動の進捗と学習のログを時系列でまとめています。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          >
            {goals.map((goal) => (
              <Card key={goal.title} className="bg-white border-slate-200">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2 text-cyan-600">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-medium">{goal.title}</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-700">{goal.value}</div>
                  <p className="text-sm text-slate-500 mt-1">{goal.note}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="space-y-4">
            {milestones.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
              >
                <Card className="bg-white border-slate-200 hover:border-cyan-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <CalendarDays className="w-4 h-4 text-cyan-500" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-cyan-200 text-cyan-700">
                          {item.tag}
                        </Badge>
                        {item.status === "done" ? (
                          <Badge className="bg-emerald-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            完了
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500 text-white">
                            <Rocket className="w-3 h-3 mr-1" />
                            進行中
                          </Badge>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">{item.title}</h3>
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
