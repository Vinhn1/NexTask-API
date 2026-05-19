import { Users, Target, Sparkles, Globe } from "lucide-react";
import { SectionLabel } from "@/components/ui/Card";

const STATS = [
  { value: "50K+",  label: "Người dùng tin tưởng" },
  { value: "120+",  label: "Quốc gia sử dụng"     },
  { value: "4.9★",  label: "Đánh giá trung bình"  },
  { value: "99.9%", label: "Uptime SLA"            },
];

const VALUES = [
  {
    icon: <Target size={22} className="text-primary" />,
    iconBg: "#eef0fd",
    title: "Tập trung vào sản phẩm",
    desc: "Mọi tính năng đều được xây dựng từ pain point thực tế của các team phát triển phần mềm.",
  },
  {
    icon: <Users size={22} className="text-emerald-600" />,
    iconBg: "#ecfdf5",
    title: "Cộng đồng trên hết",
    desc: "Roadmap công khai, nhận feedback từ cộng đồng và ưu tiên những gì quan trọng nhất với người dùng.",
  },
  {
    icon: <Sparkles size={22} className="text-amber-500" />,
    iconBg: "#fffbeb",
    title: "Đơn giản là sức mạnh",
    desc: "Giao diện tối giản nhưng mạnh mẽ. Ít click hơn, nhiều việc hơn.",
  },
  {
    icon: <Globe size={22} className="text-sky-600" />,
    iconBg: "#e0f2fe",
    title: "Toàn cầu, địa phương hóa",
    desc: "Hỗ trợ đa ngôn ngữ và múi giờ. Phục vụ các team từ Hà Nội đến Silicon Valley.",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>Về chúng tôi</SectionLabel>
          <h2 className="text-[42px] font-black tracking-tighter text-dark leading-tight mt-3">
            Được xây dựng bởi developers, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan">
              dành cho developers
            </span>
          </h2>
          <p className="text-[16px] text-muted max-w-[560px] mx-auto mt-5 leading-relaxed font-medium">
            NexTask ra đời từ sự thất vọng với các công cụ quản lý dự án phức tạp và cồng kềnh.
            Chúng tôi tin rằng productivity không nên đến với cái giá là complexity.
          </p>
        </div>

        {/* Stats banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white border border-border rounded-[20px] p-6 text-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-[36px] font-black text-dark tracking-tight leading-none mb-1">
                {value}
              </div>
              <div className="text-[13px] text-muted font-semibold">{label}</div>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          {/* Left: Story */}
          <div>
            <h3 className="text-2xl font-black text-dark mb-4">Câu chuyện của chúng tôi</h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Năm 2024, team 3 người của chúng tôi bắt đầu với một câu hỏi đơn giản: tại sao quản lý
              task lại phải phức tạp đến vậy? Sau 6 tháng sử dụng 7 công cụ khác nhau, chúng tôi
              quyết định tự xây dựng thứ mình muốn.
            </p>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              NexTask hôm nay là kết quả của hàng nghìn giờ thiết kế, lập trình và lắng nghe feedback
              từ cộng đồng. Mỗi tính năng đều có lý do tồn tại rõ ràng.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Chúng tôi đang phát triển với đội ngũ nhỏ nhưng đầy nhiệt huyết — và chúng tôi đang
              tuyển dụng những người có cùng vision.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-6 text-primary font-bold text-[14px] no-underline hover:underline"
            >
              Xem vị trí tuyển dụng →
            </a>
          </div>

          {/* Right: Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map(({ icon, iconBg, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-border rounded-[18px] p-6 hover:shadow-sm transition-shadow duration-200"
              >
                <div
                  className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-4"
                  style={{ background: iconBg }}
                >
                  {icon}
                </div>
                <h4 className="font-bold text-[15px] text-dark mb-1.5">{title}</h4>
                <p className="text-[13px] text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
