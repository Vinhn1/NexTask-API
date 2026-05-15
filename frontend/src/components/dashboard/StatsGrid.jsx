const stats = [
  {
    icon: "checklist",
    iconBg: "#e1e0ff",
    iconColor: "#4648d4",
    badge: "+12%",
    badgeBg: "#e1e0ff",
    badgeColor: "#3537c0",
    label: "Tổng nhiệm vụ",
    value: "24",
    sub: "Sprint này",
    subColor: "#767586",
  },
  {
    icon: "check_circle",
    iconBg: "#acedff",
    iconColor: "#00687a",
    badge: "18 xong",
    badgeBg: "#acedff",
    badgeColor: "#004e5c",
    label: "Đã hoàn thành",
    value: "75%",
    sub: "Đúng tiến độ",
    subColor: "#00687a",
  },
  {
    icon: "autorenew",
    iconBg: "#ffdcc5",
    iconColor: "#904900",
    badge: "Còn 6",
    badgeBg: "#ffdcc5",
    badgeColor: "#703700",
    label: "Đang thực hiện",
    value: "06",
    sub: "3 dự án",
    subColor: "#904900",
  },
  {
    icon: "warning",
    iconBg: "#ffdad6",
    iconColor: "#93000a",
    badge: "Khẩn",
    badgeBg: "#ffdad6",
    badgeColor: "#93000a",
    label: "Quá hạn",
    value: "02",
    sub: "Cần xử lý",
    subColor: "#ba1a1a",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(({ icon, iconBg, iconColor, badge, badgeBg, badgeColor, label, value, sub, subColor }) => (
        <div
          key={label}
          className="bg-white rounded-2xl border border-[#e4e1ed] p-5 hover:shadow-md hover:shadow-[#4648d4]/5 transition-shadow"
        >
          {/* Top row: icon + badge */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: iconBg }}
            >
              <span
                className="material-symbols-rounded text-2xl leading-none"
                style={{ color: iconColor }}
              >
                {icon}
              </span>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: badgeBg, color: badgeColor }}
            >
              {badge}
            </span>
          </div>

          {/* Label */}
          <p className="text-xs font-semibold text-[#767586] uppercase tracking-wider mb-1">{label}</p>

          {/* Value */}
          <p className="text-4xl font-bold text-[#1b1b23] leading-none mb-1.5">{value}</p>

          {/* Sub */}
          <p className="text-sm font-medium" style={{ color: subColor }}>{sub}</p>
        </div>
      ))}
    </div>
  );
}