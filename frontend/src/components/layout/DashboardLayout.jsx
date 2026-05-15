import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";

export default function DashboardLayout({ children, projects, currentProject, onSelectProject, taskCount = 0 }) {
  return (
    <div className="flex min-h-screen bg-[#fcf8ff]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <Sidebar 
        projects={projects} 
        currentProject={currentProject} 
        onSelectProject={onSelectProject} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 ml-60">
        <TopBar taskCount={taskCount} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
