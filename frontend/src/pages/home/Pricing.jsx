import { Check } from "lucide-react";
import { C } from "@/constants/brand";
import { Card, SectionLabel } from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import { PricingTier } from "@/components/landing/LandingParts";

export default function Pricing() {
  return (
    <section style={{ padding: "72px 32px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>Bảng giá</SectionLabel>
        <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-1px" }}>Minh bạch, không bất ngờ</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

        {/* Free */}
        <Card style={{ padding: 32 }}>
          <PricingTier
            plan="Free" planColor="#888" price="$0" priceSub="mãi mãi"
            features={["5 thành viên", "3 boards", "5GB storage"]}
            missing={["AI features"]}
            btnLabel="Bắt đầu" btnStyle="ghost"
          />
        </Card>

        {/* Pro */}
        <div style={{ padding: 32, background: C.indigo, borderRadius: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "rgba(255,255,255,0.06)", borderRadius: "50%", transform: "translate(30px,-30px)" }} />
          <div style={{ position: "absolute", top: 12, right: 16 }}>
            <Pill variant="white" style={{ fontSize: 10, padding: "4px 10px" }}>Phổ biến nhất</Pill>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Pro</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 4 }}>$12</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>/user/tháng</div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {["Không giới hạn thành viên","Không giới hạn boards","50GB storage","AI features + Integrations"].map(f => (
              <div key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#fff" }}>
                <Check size={16} color="#6ee7b7" style={{ flexShrink: 0, marginTop: 2 }} /> {f}
              </div>
            ))}
          </div>
          <a href="#" style={{ display: "block", padding: 14, background: "#fff", color: C.indigo, fontWeight: 700, fontSize: 15, borderRadius: 12, textAlign: "center", textDecoration: "none" }}>
            Dùng thử 14 ngày
          </a>
        </div>

        {/* Enterprise */}
        <Card style={{ padding: 32, background: "#0f172a", border: "none" }}>
          <PricingTier
            plan="Enterprise" planColor="#64748b" price="Custom" priceSub="liên hệ báo giá"
            priceColor="#f1f5f9" subColor="#64748b"
            features={["Tất cả tính năng Pro","SSO & SAML","SLA & support riêng","Audit logs & compliance"]}
            featureColor="#cbd5e1"
            btnLabel="Liên hệ Sales" btnStyle="dark"
            dividerColor="#1e293b"
          />
        </Card>
      </div>
    </section>
  );
}