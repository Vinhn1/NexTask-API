const tasks = [
  {
    id: 1,
    title: "Refactor thư viện UI component",
    meta: "NexTask Design System · hạn 5:00 CH",
    done: false,
    priorityColor: "#ba1a1a",
    tagBg: "#ffdad6",
    tagColor: "#93000a",
    tagLabel: "Khẩn",
  },
  {
    id: 2,
    title: "Họp đồng bộ team & lộ trình",
    meta: "Chung · hôm nay lúc 2:00 CH",
    done: false,
    priorityColor: "#904900",
    tagBg: "#ffdcc5",
    tagColor: "#703700",
    tagLabel: "Cuộc họp",
  },
  {
    id: 3,
    title: "Cập nhật tài liệu API",
    meta: "Backend team · đã xong",
    done: true,
    priorityColor: "#00687a",
    tagBg: "#acedff",
    tagColor: "#004e5c",
    tagLabel: "Xong",
  },
  {
    id: 4,
    title: "Chuẩn bị báo cáo tài chính quý",
    meta: "Tài chính · ngày mai",
    done: false,
    priorityColor: "#767586",
    tagBg: "#efecf8",
    tagColor: "#464554",
    tagLabel: "Bình thường",
  },
];

export default function TaskList() {
  return (
    <div className="bg-white rounded-2xl border border-[#e4e1ed] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e1ed]">
        <h3 className="text-base font-bold text-[#1b1b23]">Nhiệm vụ hôm nay</h3>
        <a href="#" className="text-sm font-semibold text-[#4648d4] hover:underline">
          Xem tất cả
        </a>
      </div>

      {/* Task Items */}
      {tasks.map((task, idx) => (
        <div
          key={task.id}
          className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-[#f5f2fe] transition-colors ${
            idx !== tasks.length - 1 ? "border-b border-[#e4e1ed]" : ""
          }`}
        >
          {/* Checkbox */}
          <div
            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              task.done
                ? "border-[#4648d4] bg-[#e1e0ff]"
                : "border-[#c7c4d7] hover:border-[#4648d4]"
            }`}
          >
            {task.done && (
              <span className="material-symbols-rounded text-sm text-[#4648d4] leading-none">
                check
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-semibold truncate ${
                task.done ? "line-through text-[#767586]" : "text-[#1b1b23]"
              }`}
            >
              {task.title}
            </p>
            <span className="text-xs text-[#767586] mt-0.5 block">{task.meta}</span>
          </div>

          {/* Meta: priority dot + tag */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: task.priorityColor }}
            />
            <span
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: task.tagBg, color: task.tagColor }}
            >
              {task.tagLabel}
            </span>
          </div>
        </div>
      ))}

      {/* Sprint Progress */}
      <div className="px-6 py-4 border-t border-[#e4e1ed] bg-[#fcf8ff]/50">
        <div className="flex justify-between text-sm font-medium text-[#464554] mb-2">
          <span>Mobile App v2.0 — tiến độ sprint</span>
          <span className="text-[#4648d4] font-bold">68%</span>
        </div>
        <div className="h-2 bg-[#e1e0ff] rounded-full overflow-hidden">
          <div className="h-full bg-[#4648d4] rounded-full transition-all duration-700" style={{ width: "68%" }} />
        </div>
      </div>
    </div>
  );
}