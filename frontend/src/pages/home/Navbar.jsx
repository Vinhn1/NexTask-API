import { C } from "@/constants/brand";
import { BtnPrimary } from "@/components/ui/Button";

const NAV_LINKS = ["Tính năng", "Bảng giá", "Tài liệu", "Blog"];

export default function Navbar() {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(252,248,255,0.88)", backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${C.border}`,
      padding: "0 32px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg,${C.indigo},${C.cyan})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>N</span>
        </div>
        <span style={{ fontWeight: 900, fontSize: 20, color: C.indigo, letterSpacing: "-0.5px" }}>NexTask</span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 14, fontWeight: 600 }}>
        {NAV_LINKS.map(l => (
          <a key={l} href="#" style={{ color: C.muted, textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.indigo}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}
          >{l}</a>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <a href="#" style={{ fontSize: 14, fontWeight: 600, color: C.muted, textDecoration: "none" }}>Đăng nhập</a>
        <BtnPrimary style={{ padding: "10px 20px", fontSize: 14, borderRadius: 10 }}>
          Bắt đầu miễn phí
        </BtnPrimary>
      </div>
    </nav>
  );
}