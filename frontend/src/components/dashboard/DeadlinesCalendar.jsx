const days = ["M", "T", "W", "T", "F", "S", "S"];

const calendarCells = [
  { label: "26", faded: true }, { label: "27", faded: true }, { label: "28", faded: true },
  { label: "29", faded: true }, { label: "30", faded: true },
  { label: "1" }, { label: "2" },
  { label: "3", bold: true }, { label: "4", bold: true },
  { label: "5", active: true },
  { label: "6", bold: true }, { label: "7", bold: true },
  { label: "8" }, { label: "9" },
  { label: "10", error: true },
];

const deadlines = [
  { title: "Final QA Report", date: "Due Oct 10", borderColor: "border-error" },
  { title: "Client Presentation", date: "Due Oct 14", borderColor: "border-primary" },
];

export default function DeadlinesCalendar() {
  return (
    <div
      className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/5"
      style={{ boxShadow: "0 10px 15px -3px rgba(99,102,241,0.08), 0 4px 6px -4px rgba(99,102,241,0.08)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-on-surface">Deadlines</h3>
        <span className="text-xs text-on-surface-variant">October 2024</span>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold mb-1">
        {days.map((d, i) => (
          <span key={i} className="text-on-surface-variant">{d}</span>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {calendarCells.map(({ label, faded, bold, active, error }, i) => (
          <div
            key={i}
            className={`p-1 relative ${
              active
                ? "bg-primary text-white rounded-full font-black"
                : faded
                ? "text-outline/30"
                : bold
                ? "font-bold"
                : error
                ? "font-bold text-error"
                : ""
            }`}
          >
            {label}
            {error && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-error rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Deadline items */}
      <div className="mt-4 space-y-2">
        {deadlines.map(({ title, date, borderColor }) => (
          <div
            key={title}
            className={`flex items-center gap-2 p-2 bg-surface-container-low rounded-lg border-l-4 ${borderColor}`}
          >
            <div>
              <p className="text-xs font-bold text-on-surface">{title}</p>
              <p className="text-[10px] text-on-surface-variant">{date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}