import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ projects = [], currentProject, onSelectProject, onNewTaskClick, onNewProjectClick, isOwner }) {
  const location = useLocation();

  const navItems = [
    { icon: "dashboard", label: "Tổng quan", path: "/dashboard" },
    { icon: "task_alt", label: "Nhiệm vụ", path: "/tasks" },
    { icon: "folder", label: "Dự án", path: "/projects" },
    { icon: "bar_chart", label: "Phân tích", path: "/analytics" },
    { icon: "group", label: "Đội nhóm", path: "/team" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-60 flex flex-col bg-[#f5f2fe] border-r border-[#c7c4d7] z-50">
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
        <div className="w-7 h-7 rounded-lg bg-[#4648d4] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          N
        </div>
        <span className="text-base font-semibold text-[#4648d4] tracking-tight">NexTask Pro</span>
      </div>

      <div className="mx-3 mb-4">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-[#e9e6f3] rounded-xl cursor-pointer hover:bg-[#e1e0ff] transition-colors">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4648d4] to-[#57dffe] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {currentProject?.title?.substring(0, 2).toUpperCase() || "NT"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1b1b23] truncate">
              {currentProject?.title || "NexTask"}
            </p>
            <span className="text-[11px] text-[#767586] uppercase tracking-wide">Dự án hiện tại</span>
          </div>
          <span className="material-symbols-rounded text-[18px] text-[#767586]">expand_more</span>
        </div>
      </div>

      <div className="px-5 pb-1.5 text-[11px] font-semibold text-[#767586] uppercase tracking-widest">
        Menu chính
      </div>

      <nav className="flex flex-col gap-0.5 px-3 mb-6">
        {navItems.map(({ icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={label}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-[#e1e0ff] text-[#4648d4]"
                  : "text-[#464554] hover:bg-[#e9e6f3]"
              }`}
            >
              <span className="material-symbols-rounded text-xl leading-none">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 pb-1.5 text-[11px] font-semibold text-[#767586] uppercase tracking-widest flex justify-between items-center group">
        Dự án tham gia
        <button
          onClick={onNewProjectClick}
          className="w-5 h-5 flex items-center justify-center rounded-md bg-[#e9e6f3] text-[#4648d4] hover:bg-[#4648d4] hover:text-white transition-all shadow-sm"
          title="Tạo dự án mới"
        >
          <span className="material-symbols-rounded text-[16px]">add</span>
        </button>
      </div>

      <div className="flex flex-col gap-0.5 px-3 overflow-y-auto max-h-[300px]">
        {Array.isArray(projects) && projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject?.(project)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${
              currentProject?.id === project.id
                ? "bg-[#efecf8] text-[#4648d4] font-bold"
                : "text-[#767586] hover:bg-[#e9e6f3]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#57dffe]" />
            <span className="truncate">{project.title}</span>
          </button>
        ))}
      </div>

      {isOwner && (
        <div className="mt-auto px-3 pb-5 pt-4 border-t border-[#c7c4d7]">
          <button
            onClick={onNewTaskClick}
            className="w-full py-2.5 bg-[#4648d4] hover:bg-[#3537c0] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#4648d4]/30"
          >
            <span className="material-symbols-rounded text-lg leading-none">add</span>
            Nhiệm vụ mới
          </button>
        </div>
      )}
    </aside>
  );
}
