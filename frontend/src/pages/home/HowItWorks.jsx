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
    <section className="py-18 px-8 bg-white mx-8 rounded-[24px] border border-border">
      <div className="text-center mb-12">
        <SectionLabel>Cách hoạt động</SectionLabel>
        <h2 className="text-4xl font-black tracking-tight">3 bước để bắt đầu</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className={`p-8 text-center relative border-l border-r border-[#f0edf8] ${i === 0 ? 'md:border-l-0' : ''} ${i === 2 ? 'md:border-r-0' : ''} ${i > 0 && i < 2 ? '' : ''}`}>
            {i < 2 && (
              <div 
                className="hidden md:block absolute top-14 right-0 w-1/2 h-0.5" 
                style={{ background: `linear-gradient(90deg, ${s.bg}, transparent)` }} 
              />
            )}
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-black text-white"
              style={{ background: s.bg }}
            >
              {s.n}
            </div>
            <h3 className="text-lg font-black mb-2.5">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}