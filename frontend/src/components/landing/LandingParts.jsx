import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BtnGhost } from "@/components/ui/Button";

// ── Feature card (used in bento grid) ─────────────────────────
export function FeatureCard({ icon, iconBg, title, desc }) {
  return (
    <Card className="p-8">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" 
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <h3 className="text-[18px] font-black text-dark mb-2">{title}</h3>
      <p className="text-[14px] text-muted leading-relaxed font-medium">{desc}</p>
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
      <div 
        className="text-[13px] font-bold uppercase tracking-[0.1em] mb-3" 
        style={{ color: planColor }}
      >{plan}</div>
      <div 
        className="text-[40px] font-black mb-1" 
        style={{ color: priceColor }}
      >{price}</div>
      <div 
        className="text-[13px] mb-6 font-medium" 
        style={{ color: subColor }}
      >{priceSub}</div>

      <div 
        className="border-t pt-6 flex flex-col gap-3 mb-7" 
        style={{ borderColor: dividerColor }}
      >
        {features.map(f => (
          <div key={f} className="flex gap-2 text-[14px] items-start font-medium" style={{ color: featureColor }}>
            <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" /> {f}
          </div>
        ))}
        {missing.map(f => (
          <div key={f} className="flex gap-2 text-[14px] text-slate-400 items-start font-medium">
            <X size={16} className="text-slate-200 shrink-0 mt-0.5" /> {f}
          </div>
        ))}
      </div>

      {btnStyle === "ghost" && (
        <BtnGhost className="w-full justify-center py-3.5">{btnLabel}</BtnGhost>
      )}
      {btnStyle === "dark-outline" && (
        <a 
          href="#" 
          className="block py-3.5 bg-transparent text-dark font-bold text-[15px] rounded-xl text-center no-underline border border-dark hover:bg-dark hover:text-white transition-all"
        >
          {btnLabel}
        </a>
      )}
    </>
  );
}