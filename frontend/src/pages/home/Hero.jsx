import { Link } from "react-router-dom";
import { Rocket, Play, Bell, Check } from "lucide-react";
import { C } from "@/constants/brand";
import Pill from "@/components/ui/Pill";
import { BtnPrimary, BtnGhost } from "@/components/ui/Button";
import DashboardMockup from "@/components/landing/DashboardMockup";

export default function Hero() {
  return (
    <section className="pt-[72px] px-8 text-center relative">
      {/* Glow bg */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(70,72,212,0.08)_0%,transparent_70%)] pointer-events-none" />

      <Pill variant="indigo" className="mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block mr-2" />
        Kanban 2.0 vừa ra mắt — Khám phá ngay
      </Pill>

      <h1 className="text-[clamp(40px,6vw,64px)] font-black leading-[1.05] tracking-[-2px] mb-6 max-w-[780px] mx-auto">
        Nơi những team <br />
        <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">
          xuất sắc nhất
        </span>{" "}làm việc
      </h1>

      <p className="text-[18px] text-muted max-w-[520px] mx-auto mb-9 leading-[1.7] font-medium">
        Biến hỗn độn thành trật tự. NexTask giúp team bạn lên kế hoạch, theo dõi và hoàn thành công việc — đẹp hơn, nhanh hơn.
      </p>

      <div className="flex justify-center items-center gap-3 mb-4 flex-wrap">
        <Link to="/auth">
          <BtnPrimary className="text-base px-8 py-4">
            <Rocket size={18} /> Dùng thử miễn phí
          </BtnPrimary>
        </Link>
        <BtnGhost className="text-base px-6 py-4">
          <Play size={18} className="text-primary" /> Xem demo
        </BtnGhost>
      </div>
      <p className="text-[12px] text-[#888] font-medium">
        Không cần thẻ tín dụng · Miễn phí mãi mãi · Cài đặt trong 2 phút
      </p>

      {/* Dashboard mockup + floating cards */}
      <div className="mt-12 mx-auto max-w-[860px] relative">
        <DashboardMockup />

        {/* Floating: task done */}
        <div className="absolute -top-4 -right-4 bg-white rounded-xl border border-border px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check size={14} className="text-emerald-600" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold text-dark">Task hoàn thành!</div>
            <div className="text-[10px] text-[#888]">Sarah vừa xong "Homepage"</div>
          </div>
        </div>

        {/* Floating: deadline */}
        <div className="absolute bottom-6 -left-5 bg-white rounded-xl border border-border px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
            <Bell size={14} className="text-amber-600" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold text-dark">Deadline sắp đến</div>
            <div className="text-[10px] text-[#888]">Sprint kết thúc trong 2 ngày</div>
          </div>
        </div>
      </div>
    </section>
  );
}