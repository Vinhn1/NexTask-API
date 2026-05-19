import { Check } from "lucide-react";
import { Card, SectionLabel } from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import { PricingTier } from "@/components/landing/LandingParts";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-8">
      <div className="text-center mb-12">
        <SectionLabel>Bảng giá</SectionLabel>
        <h2 className="text-4xl font-black tracking-tight">Minh bạch, không bất ngờ</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Free */}
        <Card className="p-8">
          <PricingTier
            plan="Free" planColor="#888" price="$0" priceSub="mãi mãi"
            features={["5 thành viên", "3 boards", "5GB storage"]}
            missing={["AI features"]}
            btnLabel="Bắt đầu" btnStyle="ghost"
          />
        </Card>

        {/* Pro */}
        <div className="p-8 bg-indigo rounded-[20px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-white/5 rounded-full translate-x-[30px] -translate-y-[30px]" />
          <div className="absolute top-3 right-4">
            <Pill variant="white" className="text-[10px] px-2.5 py-1">Phổ biến nhất</Pill>
          </div>
          <div className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-3">Pro</div>
          <div className="text-[40px] font-black text-white mb-1">$12</div>
          <div className="text-[13px] text-white/60 mb-6">/user/tháng</div>
          <div className="border-t border-white/15 pt-6 flex flex-col gap-3 mb-7">
            {["Không giới hạn thành viên","Không giới hạn boards","50GB storage","AI features + Integrations"].map(f => (
              <div key={f} className="flex gap-2 text-sm text-white items-start">
                <Check size={16} className="text-emerald-300 shrink-0 mt-0.5" /> {f}
              </div>
            ))}
          </div>
          <a href="#" className="block p-3.5 bg-white text-indigo font-bold text-[15px] rounded-xl text-center no-underline hover:bg-white/90 transition-colors">
            Dùng thử 14 ngày
          </a>
        </div>

        {/* Enterprise */}
        <Card className="p-8">
          <PricingTier
            plan="Enterprise" planColor="#1b1b23" price="Custom" priceSub="liên hệ báo giá"
            priceColor="#1b1b23" subColor="#64748b"
            features={["Tất cả tính năng Pro","SSO & SAML","SLA & support riêng","Audit logs & compliance"]}
            featureColor="#1b1b23"
            btnLabel="Liên hệ Sales" btnStyle="dark-outline"
            dividerColor="#f0edf8"
          />
        </Card>
      </div>
    </section>
  );
}
