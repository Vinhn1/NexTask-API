import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BtnGhost } from "@/components/ui/Button";

// ── Feature card (used in bento grid) ─────────────────────────
export function FeatureCard({ icon, iconBg, title, desc }) {
  return (
    <Card style={{ padding: 32 }}>
      <div style={{ width: 48, height: 48, background: iconBg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 900, color: "#1b1b23", marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#464554", lineHeight: 1.6, fontWeight: 500 }}>{desc}</p>
    </Card>
  );
}

// ── Pricing tier (Free / Enterprise) ──────────────────────────
export function PricingTier({
  plan, planColor, price, priceSub,
  priceColor = "#1b1b23", subColor = "#888",
  features = [], missing = [],
  featureColor = "#1b1b23",
  btnLabel, btnStyle,
  dividerColor = "#f0edf8",
}) {
  return (
    <>
      <div style={{ fontSize: 13, fontWeight: 700, color: planColor, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{plan}</div>
      <div style={{ fontSize: 40, fontWeight: 900, color: priceColor, marginBottom: 4 }}>{price}</div>
      <div style={{ fontSize: 13, color: subColor, marginBottom: 24 }}>{priceSub}</div>

      <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {features.map(f => (
          <div key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: featureColor, alignItems: "flex-start" }}>
            <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> {f}
          </div>
        ))}
        {missing.map(f => (
          <div key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#aaa", alignItems: "flex-start" }}>
            <X size={16} color="#ddd" style={{ flexShrink: 0, marginTop: 2 }} /> {f}
          </div>
        ))}
      </div>

      {btnStyle === "ghost" && (
        <BtnGhost style={{ width: "100%", justifyContent: "center", padding: 14 }}>{btnLabel}</BtnGhost>
      )}
      {btnStyle === "dark" && (
        <a href="#" style={{ display: "block", padding: 14, background: "transparent", color: "#94a3b8", fontWeight: 700, fontSize: 15, borderRadius: 12, textAlign: "center", textDecoration: "none", border: "1px solid #334155" }}>
          {btnLabel}
        </a>
      )}
    </>
  );
}