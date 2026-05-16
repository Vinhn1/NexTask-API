import { Zap, Bot, LineChart, ShieldCheck, ArrowRight, Kanban } from "lucide-react";
import { Card, SectionLabel } from "@/components/ui/Card";
import { FeatureCard } from "@/components/landing/LandingParts";

export default function Features() {
  return (
    <section className="py-24 px-8">
      <div className="text-center mb-12">
        <SectionLabel>Tính năng cốt lõi</SectionLabel>
        <h2 className="text-[42px] font-black tracking-tighter text-dark leading-tight">
          Được xây dựng cho <br />tương lai của làm việc nhóm
        </h2>
      </div>

      <div className="grid grid-cols-3 auto-rows-auto gap-4">

        {/* Kanban Smart — 2 cols */}
        <Card className="col-span-2 p-10 flex gap-10 items-center">
          <div className="flex-1">
            <div className="w-[52px] h-[52px] bg-subtle rounded-[14px] flex items-center justify-center mb-5">
              <Kanban size={24} className="text-primary" />
            </div>
            <h3 className="text-2xl font-black text-dark mb-2.5">Kanban Thông Minh</h3>
            <p className="text-[15px] text-muted leading-relaxed font-medium">
              Tự động hóa luồng công việc với AI. Kéo thả trực quan, cập nhật realtime và phân loại task thông minh.
            </p>
            <a href="#" className="inline-flex items-center gap-1.5 text-primary font-bold text-[14px] no-underline mt-4 hover:gap-2 transition-all">
              Xem thêm <ArrowRight size={14} />
            </a>
          </div>
          {/* Mini kanban visual */}
          <div className="w-[240px] shrink-0 bg-[#f8f6ff] rounded-xl p-3 grid grid-cols-2 gap-2">
            {[
              { bg: "bg-white", border: "border-border", bars: ["bg-subtle", "bg-[#f0edf8]", "bg-[#f0edf8]"], widths: ["w-[60%]","w-full","w-[80%]"] },
              { bg: "bg-primary", bars: ["bg-white/40","bg-white/20","bg-white/20"], widths: ["w-[60%]","w-full","w-[70%]"] },
              { bg: "bg-white", border: "border-border", bars: ["bg-emerald-100","bg-[#f0edf8]"], widths: ["w-[70%]","w-[90%]"] },
              { bg: "bg-white", border: "border-border", bars: ["bg-amber-100","bg-[#f0edf8]"], widths: ["w-[50%]","w-[80%]"] },
            ].map((card, i) => (
              <div key={i} className={`${card.bg} rounded-lg p-2 border ${card.border || 'border-transparent'}`}>
                {card.bars.map((b, j) => (
                  <div key={j} className={`${card.widths[j]} h-1.5 ${b} rounded-full ${j < card.bars.length - 1 ? "mb-1.5" : ""}`} />
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* Realtime Sync */}
        <Card className="p-8 bg-gradient-to-br from-primary to-cyan border-none">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-4">
            <Zap size={22} className="text-white" />
          </div>
          <h3 className="text-xl font-black text-white mb-2.5">Real-time Sync</h3>
          <p className="text-[14px] text-white/80 leading-relaxed font-medium">
            Mọi thay đổi đồng bộ tức thì trên tất cả thiết bị và thành viên.
          </p>
          <div className="mt-5 flex">
            {[
              { i: "SK", bg: "bg-indigo-300", c: "text-indigo-900" },
              { i: "MR", bg: "bg-emerald-300", c: "text-emerald-900" },
              { i: "AL", bg: "bg-amber-300", c: "text-amber-900" },
              { i: "+5", bg: "bg-white/20", c: "text-white" },
            ].map((av, idx) => (
              <div key={av.i} className={`
                w-7 h-7 rounded-full ${av.bg}
                border-2 border-primary
                flex items-center justify-center
                text-[10px] font-bold ${av.c}
                ${idx > 0 ? "-ml-2" : "ml-0"}
              `}>{av.i}</div>
            ))}
          </div>
        </Card>

        {/* Bottom cards */}
        <FeatureCard icon={<Bot size={22} className="text-sky-600" />}     iconBg="#e0f2fe" title="AI Assistant"     desc="Tự động ưu tiên và gợi ý công việc dựa trên AI." />
        <FeatureCard icon={<LineChart size={22} className="text-pink-700" />} iconBg="#fce7f3" title="Analytics"        desc="Báo cáo sprint, burndown charts và velocity tracking." />
        <FeatureCard icon={<ShieldCheck size={22} className="text-emerald-600" />} iconBg="#ecfdf5" title="Bảo mật tuyệt đối" desc="Mã hóa đầu cuối, SSO, 2FA và audit logs đầy đủ." />
      </div>
    </section>
  );
}
