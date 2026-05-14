import { Star, Rocket, MessageCircle, Code, User } from "lucide-react";
import { C } from "@/constants/brand";
import { Card, SectionLabel } from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";

// ── Testimonials ───────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "NexTask thay đổi hoàn toàn cách team chúng tôi làm việc. Tiết kiệm hơn 10 giờ mỗi tuần cho việc điều phối dự án.", name: "Alex Chen",  role: "CTO @ TechFlow",              initials: "AC", bg: "#eef0fd", color: C.indigo   },
  { quote: "Giao diện đẹp, trực quan và nhanh. Đây là công cụ quản lý task tốt nhất tôi từng dùng cho team startup.",           name: "Sarah Ren",  role: "Product Lead @ Vercel",       initials: "SR", bg: "#e0f2fe", color: "#0284c7" },
  { quote: "Từ khi dùng NexTask, tỷ lệ hoàn thành sprint của team tăng lên 40%. Không thể tưởng tượng quay lại Jira.",          name: "Mike Kim",   role: "Engineering Manager @ Stripe", initials: "MK", bg: "#d1fae5", color: "#059669" },
];

export function Testimonials() {
  return (
    <section style={{ padding: "72px 32px", background: "#fff", margin: "0 32px", borderRadius: 24, border: `1px solid ${C.border}` }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>Từ người dùng</SectionLabel>
        <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-1px" }}>Được yêu thích bởi các team</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {TESTIMONIALS.map(t => (
          <Card key={t.name} style={{ padding: 28 }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.quote}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: t.color }}>
                {t.initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#1b1b23" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{t.role}</div>
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
    <section style={{ padding: "72px 32px" }}>
      <div style={{
        background: `linear-gradient(135deg,${C.indigo} 0%,${C.indigoDark} 50%,${C.cyan} 100%)`,
        borderRadius: 28, padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "rgba(255,255,255,0.06)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -80, left: -40, width: 240, height: 240, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Pill variant="white" style={{ marginBottom: 24 }}>Sẵn sàng chưa?</Pill>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 16 }}>
            Nâng tầm hiệu suất <br />của team ngay hôm nay
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 36, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Tham gia 50,000+ người dùng và bắt đầu quản lý công việc chuyên nghiệp hơn.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "#fff", color: C.indigo, fontWeight: 700, fontSize: 16, borderRadius: 14, textDecoration: "none" }}>
              <Rocket size={18} /> Đăng ký miễn phí
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 24px", background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: 16, borderRadius: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
              Nói chuyện với Sales
            </a>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 16 }}>Không cần thẻ tín dụng · Hủy bất cứ lúc nào</p>
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
    <footer style={{ background: "#0f172a", padding: "56px 32px 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, background: `linear-gradient(135deg,${C.indigo},${C.cyan})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>N</span>
            </div>
            <span style={{ fontWeight: 900, fontSize: 18, color: "#f1f5f9" }}>NexTask</span>
          </div>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, maxWidth: 240, fontWeight: 500 }}>
            Làm cho công việc trở nên dễ dàng và thú vị hơn cho mọi người, ở mọi nơi.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {[<MessageCircle size={16} />, <Code size={16} />, <User size={16} />].map((ic, i) => (
              <a key={i} href="#" style={{ width: 32, height: 32, background: "#1e293b", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", textDecoration: "none" }}>
                {ic}
              </a>
            ))}
          </div>
        </div>
        {FOOTER_COLS.map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>{col.title}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {col.links.map(l => (
                <a key={l} href="#" style={{ fontSize: 14, color: "#64748b", textDecoration: "none", fontWeight: 500 }}
                  onMouseEnter={e => e.currentTarget.style.color = "#94a3b8"}
                  onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
                >{l}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid #1e293b", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#334155", fontWeight: 500 }}>© 2026 NexTask Platform. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Điều khoản","Bảo mật","Cookie"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#334155", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}