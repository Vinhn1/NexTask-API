// Calendar data for October 2024
const calDays = ["T2","T3","T4","T5","T6","T7","CN"];

// Cells: null = prev month faded, number = date, special flags
const calCells = [
  { n: 26, prev: true }, { n: 27, prev: true }, { n: 28, prev: true },
  { n: 29, prev: true }, { n: 30, prev: true },
  { n: 1 }, { n: 2 },
  { n: 3 }, { n: 4 }, { n: 5, today: true },
  { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 },
  { n: 10, event: true },
  { n: 11 }, { n: 12 }, { n: 13 }, { n: 14, project: true },
];

const deadlines = [
  { color: "#ba1a1a", title: "Báo cáo QA cuối kỳ", due: "Hạn 10 Th10" },
  { color: "#4648d4", title: "Thuyết trình khách hàng", due: "Hạn 14 Th10" },
];

export default function DeadlinesCalendar() {
  return (
    <div className="bg-white rounded-2xl border border-[#e4e1ed] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#e4e1ed]">
        <span className="text-base font-bold text-[#1b1b23]">Hạn chót</span>
        <span className="text-xs text-[#767586] font-medium">Tháng 10, 2024</span>
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
          {calCells.map((cell, i) => {
            if (cell.prev) return (
              <div key={i} className="text-[12px] text-[#c7c4d7] py-1.5 text-center rounded-lg">{cell.n}</div>
            );
            if (cell.today) return (
              <div key={i} className="text-[12px] bg-[#4648d4] text-white font-semibold py-1.5 text-center rounded-lg cursor-pointer">{cell.n}</div>
            );
            if (cell.event) return (
              <div key={i} className="relative text-[12px] text-[#ba1a1a] font-semibold py-1.5 text-center rounded-lg cursor-pointer hover:bg-[#ffdad6]/30">
                {cell.n}
                <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ba1a1a]" />
              </div>
            );
            if (cell.project) return (
              <div key={i} className="text-[12px] text-[#4648d4] font-semibold py-1.5 text-center rounded-lg cursor-pointer hover:bg-[#e1e0ff]/50">{cell.n}</div>
            );
            return (
              <div key={i} className="text-[12px] text-[#464554] py-1.5 text-center rounded-lg cursor-pointer hover:bg-[#e9e6f3]">{cell.n}</div>
            );
          })}
        </div>
      </div>

      {/* Deadline List */}
      <div className="px-5 pb-4 pt-1">
        {deadlines.map((dl, idx) => (
          <div
            key={dl.title}
            className={`flex items-center gap-3 py-3 ${
              idx !== deadlines.length - 1 ? "border-b border-[#e4e1ed]" : ""
            }`}
          >
            <div className="w-1 h-9 rounded-full flex-shrink-0" style={{ background: dl.color }} />
            <div>
              <p className="text-sm font-semibold text-[#1b1b23]">{dl.title}</p>
              <span className="text-xs text-[#767586]">{dl.due}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}