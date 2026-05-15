const navItems = [
  { icon: "dashboard", label: "Dashboard", active: true, fill: true },
  { icon: "check_circle", label: "My Tasks" },
  { icon: "folder", label: "Projects" },
  { icon: "bar_chart", label: "Analytics" },
  { icon: "group", label: "Team" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col bg-surface-container-low border-r border-outline-variant/20 p-md space-y-base z-50">
      {/* Brand + Workspace */}
      <div className="px-sm py-md">
        <h1 className="font-black text-2xl text-primary tracking-tight">NexTask Pro</h1>
        <div className="mt-8 flex items-center gap-sm p-sm bg-surface-container-high rounded-lg cursor-pointer hover:bg-surface-container-highest transition-all duration-200">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
            ET
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-on-surface truncate">Engineering Team</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Workspace</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-on-surface-variant text-xl">unfold_more</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 mt-4">
        {navItems.map(({ icon, label, active, fill }) => (
          <a
            key={label}
            href="#"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              active
                ? "bg-primary-container text-on-primary-container font-bold translate-x-1"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={fill ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {icon}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase">{label}</span>
          </a>
        ))}
      </nav>

      {/* New Task CTA */}
      <div className="pt-4 border-t border-outline-variant/20">
        <button className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
          <span className="material-symbols-outlined">add</span>
          <span>New Task</span>
        </button>
      </div>
    </aside>
  );
}