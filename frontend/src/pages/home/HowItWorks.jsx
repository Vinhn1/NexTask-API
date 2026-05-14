// ── HowItWorks.jsx ────────────────────────────────────────────
import { C } from "@/constants/brand";
import { SectionLabel } from "@/components/ui/Card";

export function HowItWorks() {
  const steps = [
    { n: 1, bg: C.indigo,   title: "Tạo Workspace",        desc: "Đặt tên team, mời thành viên và chọn template phù hợp." },
    { n: 2, bg: C.cyan,     title: "Thêm công việc",       desc: "Tạo task, giao việc, đặt deadline và ưu tiên từng hạng mục." },
    { n: 3, bg: "#10b981",  title: "Theo dõi & hoàn thành", desc: "Dashboard realtime, báo cáo tự động và ăn mừng thành quả." },
  ];
  return (
    <section style={{ padding: "72px 32px", background: "#fff", margin: "0 32px", borderRadius: 24, border: `1px solid ${C.border}` }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>Cách hoạt động</SectionLabel>
        <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-1px" }}>3 bước để bắt đầu</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{
            padding: 32, textAlign: "center", position: "relative",
            borderLeft:  i > 0 ? "1px solid #f0edf8" : "none",
            borderRight: i < 2 ? "1px solid #f0edf8" : "none",
          }}>
            {i < 2 && (
              <div style={{ position: "absolute", top: 56, right: 0, width: "50%", height: 2, background: `linear-gradient(90deg,${s.bg},transparent)` }} />
            )}
            <div style={{ width: 56, height: 56, background: s.bg, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, fontWeight: 900, color: "#fff" }}>
              {s.n}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 10 }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}