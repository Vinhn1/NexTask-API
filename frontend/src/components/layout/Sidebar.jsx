import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProject } from "../../contexts/ProjectContext";

export default function Sidebar({ onNewTaskClick, onNewProjectClick }) {
  const location = useLocation();
  const { user } = useAuth();
  const { projects, currentProject, selectProject, loading } = useProject();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isOwner = user?.id === currentProject?.ownerId;

  const navItems = [
    { icon: "dashboard", label: "Tổng quan", path: "/dashboard" },
    { icon: "task_alt", label: "Nhiệm vụ", path: "/tasks" },
    { icon: "folder", label: "Dự án", path: "/projects" },
    { icon: "bar_chart", label: "Phân tích", path: "/analytics" },
    { icon: "group", label: "Đội nhóm", path: "/team" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-full w-60 flex flex-col bg-[#f5f2fe] border-r border-[#c7c4d7] z-50">
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
        <div className="w-7 h-7 rounded-lg bg-[#4648d4] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          N
        </div>
        <span className="text-base font-semibold text-[#4648d4] tracking-tight">NexTask Pro</span>
      </div>

      <div className="mx-3 mb-4 relative" ref={dropdownRef}>
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2.5 px-3 py-2 bg-[#e9e6f3] rounded-xl cursor-pointer hover:bg-[#e1e0ff] transition-colors border border-transparent active:border-[#4648d4]/30"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4648d4] to-[#57dffe] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {currentProject?.title?.substring(0, 2).toUpperCase() || "NT"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1b1b23] truncate">
              {currentProject?.title || (loading ? "Đang tải..." : "Chọn dự án")}
            </p>
            <span className="text-[11px] text-[#767586] uppercase tracking-wide">Dự án hiện tại</span>
          </div>
          <span className={`material-symbols-rounded text-[18px] text-[#767586] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
        </div>

        {/* Project Switcher Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-xl border border-[#c7c4d7] py-1.5 z-[60] animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="px-3 py-1.5 text-[10px] font-bold text-[#767586] uppercase tracking-wider">
              Chuyển đổi dự án
            </div>
            <div className="max-h-[240px] overflow-y-auto px-1.5">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    selectProject(project.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                    currentProject?.id === project.id
                      ? "bg-[#efecf8] text-[#4648d4] font-semibold"
                      : "text-[#464554] hover:bg-[#f5f2fe]"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${currentProject?.id === project.id ? 'bg-[#4648d4]' : 'bg-[#c7c4d7]'}`} />
                  <span className="truncate">{project.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-1 pt-1 border-t border-[#f0f0f5] px-1.5">
              <button
                onClick={() => {
                  onNewProjectClick?.();
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-[#4648d4] font-medium hover:bg-[#f5f2fe] transition-colors"
              >
                <span className="material-symbols-rounded text-lg">add_circle</span>
                Tạo dự án mới
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 pb-1.5 text-[11px] font-semibold text-[#767586] uppercase tracking-widest">
        Menu chính
      </div>

      <nav className="flex flex-col gap-0.5 px-3 mb-6">
        {navItems.map(({ icon, label, path }) => {
          const active = location.pathname === path;
          const queryPath = currentProject ? `${path}?projectId=${currentProject.id}` : path;
          return (
            <Link
              key={label}
              to={queryPath}
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
