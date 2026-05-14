import { Zap, Bot, LineChart, ShieldCheck, ArrowRight, LayoutKanban } from "lucide-react";
import { C } from "@/constants/brand";
import { Card, SectionLabel } from "@/components/ui/Card";
import { FeatureCard } from "@/components/landing/LandingParts";

export default function Features() {
  return (
    <section style={{ padding: "72px 32px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>Tính năng cốt lõi</SectionLabel>
        <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-1px", color: "#1b1b23" }}>
          Được xây dựng cho <br />tương lai của làm việc nhóm
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto", gap: 16 }}>

        {/* Kanban Smart — 2 cols */}
        <Card style={{ gridColumn: "span 2", padding: 40, display: "flex", gap: 40, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ width: 52, height: 52, background: "#eef0fd", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <LayoutKanban size={24} color={C.indigo} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: "#1b1b23", marginBottom: 10 }}>Kanban Thông Minh</h3>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.6, fontWeight: 500 }}>
              Tự động hóa luồng công việc với AI. Kéo thả trực quan, cập nhật realtime và phân loại task thông minh.
            </p>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.indigo, fontWeight: 700, fontSize: 14, textDecoration: "none", marginTop: 16 }}>
              Xem thêm <ArrowRight size={14} />
            </a>
          </div>
          {/* Mini kanban visual */}
          <div style={{ width: 240, flexShrink: 0, background: "#f8f6ff", borderRadius: 12, padding: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { bg: "#fff", border: `1px solid ${C.border}`, bars: ["#eef0fd", "#f0edf8", "#f0edf8"], widths: ["60%","100%","80%"] },
              { bg: C.indigo, bars: ["rgba(255,255,255,0.4)","rgba(255,255,255,0.2)","rgba(255,255,255,0.2)"], widths: ["60%","100%","70%"] },
              { bg: "#fff", border: `1px solid ${C.border}`, bars: ["#d1fae5","#f0edf8"], widths: ["70%","90%"] },
              { bg: "#fff", border: `1px solid ${C.border}`, bars: ["#fef3e2","#f0edf8"], widths: ["50%","80%"] },
            ].map((card, i) => (
              <div key={i} style={{ background: card.bg, borderRadius: 8, padding: 8, border: card.border }}>
                {card.bars.map((b, j) => (
                  <div key={j} style={{ width: card.widths[j], height: 6, background: b, borderRadius: 4, marginBottom: j < card.bars.length - 1 ? 6 : 0 }} />
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* Realtime Sync */}
        <Card style={{ padding: 32, background: `linear-gradient(135deg,${C.indigo} 0%,${C.cyan} 100%)`, border: "none" }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Zap size={22} color="#fff" />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 10 }}>Real-time Sync</h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, fontWeight: 500 }}>
            Mọi thay đổi đồng bộ tức thì trên tất cả thiết bị và thành viên.
          </p>
          <div style={{ marginTop: 20, display: "flex" }}>
            {[
              { i: "SK", bg: "#a5b4fc", c: "#3730a3" },
              { i: "MR", bg: "#6ee7b7", c: "#065f46" },
              { i: "AL", bg: "#fcd38d", c: "#92400e" },
              { i: "+5", bg: "rgba(255,255,255,0.2)", c: "#fff" },
            ].map((av, idx) => (
              <div key={av.i} style={{
                width: 28, height: 28, borderRadius: "50%", background: av.bg,
                border: `2px solid ${C.indigo}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: av.c,
                marginLeft: idx > 0 ? -8 : 0,
              }}>{av.i}</div>
            ))}
          </div>
        </Card>

        {/* Bottom cards */}
        <FeatureCard icon={<Bot size={22} color="#0284c7" />}     iconBg="#e0f2fe" title="AI Assistant"     desc="Tự động ưu tiên và gợi ý công việc dựa trên AI." />
        <FeatureCard icon={<LineChart size={22} color="#be185d" />} iconBg="#fce7f3" title="Analytics"        desc="Báo cáo sprint, burndown charts và velocity tracking." />
        <FeatureCard icon={<ShieldCheck size={22} color="#059669" />} iconBg="#ecfdf5" title="Bảo mật tuyệt đối" desc="Mã hóa đầu cuối, SSO, 2FA và audit logs đầy đủ." />
      </div>
    </section>
  );
}