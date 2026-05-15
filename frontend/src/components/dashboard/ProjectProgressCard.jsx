export default function ProjectProgressCard({
  projectName = "Mobile App v2.0",
  progress = 68,
}) {
  return (
    <div className="bg-[#4648d4] rounded-2xl p-5 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -left-4 -bottom-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Label */}
        <p className="text-xs font-semibold text-[#c0c1ff] uppercase tracking-widest mb-1">
          Dự án hiện tại
        </p>

        {/* Project Name */}
        <h4 className="text-lg font-bold text-white mb-4 leading-tight">{projectName}</h4>

        {/* Progress Label */}
        <div className="flex justify-between text-sm text-[#c0c1ff] mb-2">
          <span>Tiến độ</span>
          <span className="font-bold text-white">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Launch Button */}
        <button className="mt-5 w-full py-2.5 bg-white text-[#4648d4] text-sm font-bold rounded-xl hover:bg-[#e1e0ff] transition-colors">
          Mở Workspace
        </button>
      </div>
    </div>
  );
}