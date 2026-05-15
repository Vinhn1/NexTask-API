export default function TaskList({ tasks, onToggle, projectName, progress }) {
  
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'HIGH':
        return { color: "#ba1a1a", bg: "#ffdad6", text: "#93000a", label: "Khẩn" };
      case 'MEDIUM':
        return { color: "#904900", bg: "#ffdcc5", text: "#703700", label: "Trung bình" };
      case 'LOW':
        return { color: "#00687a", bg: "#acedff", text: "#004e5c", label: "Thấp" };
      default:
        return { color: "#767586", bg: "#efecf8", text: "#464554", label: "Bình thường" };
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Không có hạn";
    const date = new Date(dateStr);
    return `hạn ${date.toLocaleDateString('vi-VN')} lúc ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e4e1ed] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e1ed]">
        <h3 className="text-base font-bold text-[#1b1b23]">Nhiệm vụ gần đây</h3>
        <a href="#" className="text-sm font-semibold text-[#4648d4] hover:underline">
          Xem tất cả
        </a>
      </div>

      {/* Task Items */}
      {tasks.length > 0 ? (
        tasks.map((task, idx) => {
          const isDone = task.status === 'DONE';
          const pInfo = getPriorityInfo(task.priority);
          
          return (
            <div
              key={task.id}
              className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-[#f5f2fe] transition-colors ${
                idx !== tasks.length - 1 ? "border-b border-[#e4e1ed]" : ""
              }`}
              onClick={() => onToggle(task.id, !isDone)}
            >
              {/* Checkbox */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  isDone
                    ? "border-[#4648d4] bg-[#e1e0ff]"
                    : "border-[#c7c4d7] hover:border-[#4648d4]"
                }`}
              >
                {isDone && (
                  <span className="material-symbols-rounded text-sm text-[#4648d4] leading-none">
                    check
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold truncate ${
                    isDone ? "line-through text-[#767586]" : "text-[#1b1b23]"
                  }`}
                >
                  {task.title}
                </p>
                <span className="text-xs text-[#767586] mt-0.5 block">
                  {task.project?.title || projectName} · {isDone ? "đã xong" : formatDate(task.dueDate)}
                </span>
              </div>

              {/* Meta: priority dot + tag */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: pInfo.color }}
                />
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: pInfo.bg, color: pInfo.text }}
                >
                  {pInfo.label}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="px-6 py-8 text-center text-[#767586]">
          Chưa có nhiệm vụ nào trong dự án này.
        </div>
      )}

      {/* Sprint Progress */}
      <div className="px-6 py-4 border-t border-[#e4e1ed] bg-[#fcf8ff]/50">
        <div className="flex justify-between text-sm font-medium text-[#464554] mb-2">
          <span>{projectName} — tiến độ sprint</span>
          <span className="text-[#4648d4] font-bold">{progress}%</span>
        </div>
        <div className="h-2 bg-[#e1e0ff] rounded-full overflow-hidden">
          <div className="h-full bg-[#4648d4] rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}