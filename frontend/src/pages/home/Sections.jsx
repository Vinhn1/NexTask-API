import { Star, Rocket, MessageCircle, Code, User } from "lucide-react";
import { Link } from "react-router-dom";
import { C } from "@/constants/brand";
import { Card, SectionLabel } from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";

// ── Testimonials ───────────────────────────────────────────────
// ... existing TESTIMONIALS ...
const TESTIMONIALS = [
  { quote: "NexTask thay đổi hoàn toàn cách team chúng tôi làm việc. Tiết kiệm hơn 10 giờ mỗi tuần cho việc điều phối dự án.", name: "Alex Chen",  role: "CTO @ TechFlow",              initials: "AC", bg: "#eef0fd", color: C.indigo   },
  { quote: "Giao diện đẹp, trực quan và nhanh. Đây là công cụ quản lý task tốt nhất tôi từng dùng cho team startup.",           name: "Sarah Ren",  role: "Product Lead @ Vercel",       initials: "SR", bg: "#e0f2fe", color: "#0284c7" },
  { quote: "Từ khi dùng NexTask, tỷ lệ hoàn thành sprint của team tăng lên 40%. Không thể tưởng tượng quay lại Jira.",          name: "Mike Kim",   role: "Engineering Manager @ Stripe", initials: "MK", bg: "#d1fae5", color: "#059669" },
];

export function Testimonials() {
  return (
    <section className="py-24 px-8 bg-white mx-8 my-12 rounded-[24px] border border-border">
      <div className="text-center mb-12">
        <SectionLabel>Từ người dùng</SectionLabel>
        <h2 className="text-4xl font-black tracking-tight">Được yêu thích bởi các team</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map(t => (
          <Card key={t.name} className="p-7">
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="text-sm text-muted leading-relaxed mb-5 italic">"{t.quote}"</p>
            <div className="flex items-center gap-2.5">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px]"
                style={{ background: t.bg, color: t.color }}
              >
                {t.initials}
              </div>
              <div>
                <div className="font-bold text-[13px] text-dark">{t.name}</div>
                <div className="text-[12px] text-gray-400">{t.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ── CTABanner ──────────────────────────────────────────────────
export function CTABanner() {
  return (
    <section className="py-24 px-8">
      <div className="bg-gradient-to-br from-indigo via-indigoDark to-cyan rounded-[28px] px-12 py-16 text-center relative overflow-hidden">
        <div className="absolute -top-15 -right-15 w-[200px] h-[200px] bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-10 w-[240px] h-[240px] bg-white/5 rounded-full" />
        <div className="relative z-10">
          <Pill variant="white" className="mb-6">Sẵn sàng chưa?</Pill>
          <h2 className="text-4xl md:text-[44px] font-black text-white tracking-tight mb-4">
            Nâng tầm hiệu suất <br />của team ngay hôm nay
          </h2>
          <p className="text-base text-white/70 mb-9 max-w-[480px] mx-auto">
            Tham gia 50,000+ người dùng và bắt đầu quản lý công việc chuyên nghiệp hơn.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/auth?mode=signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo font-bold text-base rounded-[14px] no-underline hover:bg-white/90 transition-all">
              <Rocket size={18} /> Đăng ký miễn phí
            </Link>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 text-white font-semibold text-base rounded-[14px] no-underline border border-white/20 hover:bg-white/20 transition-all">
              Nói chuyện với Sales
            </a>
          </div>
          <p className="text-[12px] text-white/50 mt-4">Không cần thẻ tín dụng · Hủy bất cứ lúc nào</p>
        </div>
      </div>
    </section>
  );
}


// ── Footer ─────────────────────────────────────────────────────
const FOOTER_COLS = [
  { title: "Sản phẩm", links: ["Tính năng","Bảng giá","Changelog","Roadmap"] },
  { title: "Công ty",  links: ["Về chúng tôi","Blog","Tuyển dụng","Liên hệ"] },
  { title: "Hỗ trợ",  links: ["Tài liệu","API Reference","Community","Status"] },
];

export function Footer() {
  return (
    <footer className="bg-[#0f172a] px-8 pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo to-cyan rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-base">N</span>
            </div>
            <span className="font-black text-lg text-[#f1f5f9]">NexTask</span>
          </div>
          <p className="text-sm text-[#64748b] leading-relaxed max-w-[240px] font-medium">
            Làm cho công việc trở nên dễ dàng và thú vị hơn cho mọi người, ở mọi nơi.
          </p>
          <div className="flex gap-3 mt-5">
            {[<MessageCircle size={16} />, <Code size={16} />, <User size={16} />].map((ic, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-[#1e293b] rounded-lg flex items-center justify-center text-[#64748b] no-underline hover:text-[#94a3b8] transition-colors">
                {ic}
              </a>
            ))}
          </div>
        </div>
        {FOOTER_COLS.map(col => (
          <div key={col.title}>
            <h4 className="text-[12px] font-bold text-[#94a3b8] uppercase tracking-widest mb-5">{col.title}</h4>
            <div className="flex flex-col gap-3">
              {col.links.map(l => (
                <a key={l} href="#" className="text-sm text-[#64748b] no-underline font-medium hover:text-[#94a3b8] transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#1e293b] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[12px] text-[#334155] font-medium">© 2026 NexTask Platform. All rights reserved.</span>
        <div className="flex gap-5">
          {["Điều khoản","Bảo mật","Cookie"].map(l => (
            <a key={l} href="#" className="text-[12px] text-[#334155] no-underline hover:text-[#64748b] transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}