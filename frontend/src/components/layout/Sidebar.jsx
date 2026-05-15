const navItems = [
  { icon: "dashboard", label: "Tổng quan", active: true },
  { icon: "task_alt", label: "Nhiệm vụ" },
  { icon: "folder", label: "Dự án" },
  { icon: "bar_chart", label: "Phân tích" },
  { icon: "group", label: "Đội nhóm" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 flex flex-col bg-[#f5f2fe] border-r border-[#c7c4d7] z-50">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
        <div className="w-7 h-7 rounded-lg bg-[#4648d4] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          N
        </div>
        <span className="text-base font-semibold text-[#4648d4] tracking-tight">NexTask Pro</span>
      </div>

      {/* Workspace Chip */}
      <div className="mx-3 mb-4">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-[#e9e6f3] rounded-xl cursor-pointer hover:bg-[#e1e0ff] transition-colors">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4648d4] to-[#57dffe] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            ET
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1b1b23] truncate">Engineering Team</p>
            <span className="text-[11px] text-[#767586] uppercase tracking-wide">Workspace</span>
          </div>
          <span className="material-symbols-rounded text-[18px] text-[#767586]">expand_more</span>
        </div>
      </div>

      {/* Nav Section Label */}
      <div className="px-5 pb-1.5 text-[11px] font-semibold text-[#767586] uppercase tracking-widest">
        Menu
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-0.5 px-3">
        {navItems.map(({ icon, label, active }) => (
          <a
            key={label}
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              active
                ? "bg-[#e1e0ff] text-[#4648d4]"
                : "text-[#464554] hover:bg-[#e9e6f3]"
            }`}
          >
            <span className="material-symbols-rounded text-xl leading-none">{icon}</span>
            {label}
          </a>
        ))}
      </nav>

      {/* Footer: New Task Button */}
      <div className="mt-auto px-3 pb-5 pt-4 border-t border-[#c7c4d7]">
        <button className="w-full py-2.5 bg-[#4648d4] hover:bg-[#3537c0] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#4648d4]/30">
          <span className="material-symbols-rounded text-lg leading-none">add</span>
          Nhiệm vụ mới
        </button>
      </div>
    </aside>
  );
}