const bars = [
  { day: "T2", height: 26, type: "normal" },
  { day: "T3", height: 44, type: "hi" },
  { day: "T4", height: 20, type: "mid" },
  { day: "T5", height: 52, type: "hi" },
  { day: "T6", height: 34, type: "mid" },
  { day: "T7", height: 12, type: "normal" },
  { day: "CN", height: 8, type: "normal" },
];

const barColor = {
  normal: "#e1e0ff",
  hi: "#4648d4",
  mid: "#57dffe",
};

export default function WeeklyOutput() {
  return (
    <div className="bg-white rounded-2xl border border-[#e4e1ed] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e1ed]">
        <h3 className="text-base font-bold text-[#1b1b23]">Hiệu suất tuần</h3>
        <span className="text-xs text-[#767586] font-medium">Nhiệm vụ hoàn thành mỗi ngày</span>
      </div>

      {/* Chart */}
      <div className="px-6 pt-4 pb-5">
        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-xs text-[#767586] font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#4648d4]" />
            Nhiều
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#57dffe]" />
            Trung bình
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#e1e0ff]" />
            Ít
          </div>
        </div>

        {/* Bars */}
        <div className="flex items-end gap-2 h-20">
          {bars.map(({ day, height, type }) => (
            <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className="w-full rounded-t-md transition-all duration-500"
                style={{ height: `${height}px`, background: barColor[type] }}
              />
              <span className="text-xs text-[#767586] font-medium">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
