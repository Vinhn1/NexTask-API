import { Rocket, Play, Bell, Check } from "lucide-react";
import { C } from "@/constants/brand";
import Pill from "@/components/ui/Pill";
import { BtnPrimary, BtnGhost } from "@/components/ui/Button";
import DashboardMockup from "@/components/landing/DashboardMockup";

export default function Hero() {
  return (
    <section style={{ padding: "72px 32px 0", textAlign: "center", position: "relative" }}>
      {/* Glow bg */}
      <div style={{
        position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 500,
        background: "radial-gradient(ellipse at center,rgba(70,72,212,0.08) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <Pill variant="indigo" style={{ marginBottom: 20 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.indigo, display: "inline-block" }} />
        Kanban 2.0 vừa ra mắt — Khám phá ngay
      </Pill>

      <h1 style={{
        fontSize: "clamp(40px,6vw,64px)", fontWeight: 900,
        lineHeight: 1.05, letterSpacing: "-2px",
        marginBottom: 24, maxWidth: 780, marginLeft: "auto", marginRight: "auto",
      }}>
        Nơi những team <br />
        <span style={{
          background: `linear-gradient(90deg,${C.indigo},${C.cyan})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          xuất sắc nhất
        </span>{" "}làm việc
      </h1>

      <p style={{ fontSize: 18, color: C.muted, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7, fontWeight: 500 }}>
        Biến hỗn độn thành trật tự. NexTask giúp team bạn lên kế hoạch, theo dõi và hoàn thành công việc — đẹp hơn, nhanh hơn.
      </p>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <BtnPrimary style={{ fontSize: 16, padding: "16px 32px" }}>
          <Rocket size={18} /> Dùng thử miễn phí
        </BtnPrimary>
        <BtnGhost style={{ fontSize: 16, padding: "16px 24px" }}>
          <Play size={18} color={C.indigo} /> Xem demo
        </BtnGhost>
      </div>
      <p style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>
        Không cần thẻ tín dụng · Miễn phí mãi mãi · Cài đặt trong 2 phút
      </p>

      {/* Dashboard mockup + floating cards */}
      <div style={{ margin: "48px auto 0", maxWidth: 860, position: "relative" }}>
        <DashboardMockup />

        {/* Floating: task done */}
        <div style={{
          position: "absolute", top: -16, right: -16,
          background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`,
          padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Check size={14} color="#059669" />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1b1b23" }}>Task hoàn thành!</div>
            <div style={{ fontSize: 10, color: "#888" }}>Sarah vừa xong "Homepage"</div>
          </div>
        </div>

        {/* Floating: deadline */}
        <div style={{
          position: "absolute", bottom: 24, left: -20,
          background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`,
          padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fef3e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={14} color="#d97706" />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1b1b23" }}>Deadline sắp đến</div>
            <div style={{ fontSize: 10, color: "#888" }}>Sprint kết thúc trong 2 ngày</div>
          </div>
        </div>
      </div>
    </section>
  );
}