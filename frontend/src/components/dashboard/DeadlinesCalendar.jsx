import { useState } from "react";

const calDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export default function DeadlinesCalendar({ tasks = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Lấy thông tin tháng hiện tại
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = `Tháng ${month + 1}, ${year}`;

  // Tạo mảng các ngày trong tháng
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Điều chỉnh JS getDay (0=CN, 1=T2...) sang (T2=0...CN=6)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];
  // Ngày tháng trước (faded)
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ n: prevMonthDays - i, prev: true });
  }
  // Ngày trong tháng
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
    
    // Tìm tasks có hạn trong ngày này
    const hasEvent = tasks.some(t => {
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      return d.getDate() === i && d.getMonth() === month && d.getFullYear() === year;
    });

    cells.push({ n: i, today: isToday, event: hasEvent });
  }

  // Danh sách deadline sắp tới (lấy tối đa 3 cái gần nhất)
  const upcomingDeadlines = tasks
    .filter(t => t.dueDate && new Date(t.dueDate) >= new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3)
    .map(t => {
      const d = new Date(t.dueDate);
      return {
        title: t.title,
        due: `Hạn ${d.getDate()} Th${d.getMonth() + 1}`,
        color: t.priority === 'HIGH' ? "#ba1a1a" : "#4648d4"
      };
    });

  return (
    <div className="bg-white rounded-2xl border border-[#e4e1ed] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#e4e1ed]">
        <span className="text-base font-bold text-[#1b1b23]">Hạn chót</span>
        <span className="text-xs text-[#767586] font-medium">{monthName}</span>
      </div>

      {/* Calendar Grid */}
      <div className="px-4 py-3">
        {/* Day headers */}
        <div className="grid grid-cols-7 text-center mb-1">
          {calDays.map((d) => (
            <span key={d} className="text-[11px] font-semibold text-[#767586] py-1">{d}</span>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((cell, i) => {
            if (cell.prev) return (
              <div key={`prev-${i}`} className="text-[12px] text-[#c7c4d7] py-1.5 text-center rounded-lg">{cell.n}</div>
            );
            
            const baseClass = "text-[12px] py-1.5 text-center rounded-lg cursor-pointer transition-colors ";
            let activeClass = cell.today 
              ? "bg-[#4648d4] text-white font-semibold" 
              : "text-[#464554] hover:bg-[#e9e6f3]";
            
            return (
              <div key={i} className={`${baseClass} ${activeClass} relative`}>
                {cell.n}
                {cell.event && !cell.today && (
                  <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ba1a1a]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Deadline List */}
      <div className="px-5 pb-4 pt-1">
        {upcomingDeadlines.length > 0 ? (
          upcomingDeadlines.map((dl, idx) => (
            <div
              key={`${dl.title}-${idx}`}
              className={`flex items-center gap-3 py-3 ${
                idx !== upcomingDeadlines.length - 1 ? "border-b border-[#e4e1ed]" : ""
              }`}
            >
              <div className="w-1 h-9 rounded-full flex-shrink-0" style={{ background: dl.color }} />
              <div>
                <p className="text-sm font-semibold text-[#1b1b23] line-clamp-1">{dl.title}</p>
                <span className="text-xs text-[#767586]">{dl.due}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-4 text-center text-xs text-[#767586]">Không có hạn chót sắp tới</div>
        )}
      </div>
    </div>
  );
}