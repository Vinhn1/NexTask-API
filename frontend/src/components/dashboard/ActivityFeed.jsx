const activities = [
  {
    id: 1,
    iconBg: "#acedff",
    iconColor: "#004e5c",
    icon: "edit",
    actor: "Sarah Jenkins",
    action: "đã cập nhật",
    target: "Tài liệu API",
    time: "24 phút trước",
  },
  {
    id: 2,
    iconBg: "#e1e0ff",
    iconColor: "#3537c0",
    icon: "add_circle",
    actor: "Bạn",
    action: "đã tạo",
    target: "4 nhiệm vụ trong Mobile App v2.0",
    time: "2 giờ trước",
  },
  {
    id: 3,
    iconBg: "#ffdcc5",
    iconColor: "#703700",
    icon: "chat_bubble",
    actor: "Mike Ross",
    action: "đã bình luận trong",
    target: "Home Screen Redesign",
    time: "Hôm qua",
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl border border-[#e4e1ed] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#e4e1ed]">
        <h3 className="text-base font-bold text-[#1b1b23]">Hoạt động gần đây</h3>
      </div>

      {/* Activity List */}
      <div className="px-6">
        {activities.map((item, idx) => (
          <div
            key={item.id}
            className={`flex gap-4 py-4 ${
              idx !== activities.length - 1 ? "border-b border-[#e4e1ed]" : ""
            }`}
          >
            {/* Icon */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: item.iconBg }}
            >
              <span
                className="material-symbols-rounded text-lg leading-none"
                style={{ color: item.iconColor }}
              >
                {item.icon}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1b1b23] leading-relaxed">
                <span className="font-semibold">{item.actor}</span>{" "}
                <span className="text-[#767586]">{item.action}</span>{" "}
                <span className="font-semibold text-[#4648d4]">{item.target}</span>
              </p>
              <span className="text-xs text-[#767586] mt-0.5 block">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}