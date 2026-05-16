import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import StatsGrid from "../components/dashboard/StatsGrid.jsx";
import TaskList from "../components/dashboard/TaskList.jsx";
import WeeklyOutput from "../components/dashboard/WeeklyOutput.jsx";
import ActivityFeed from "../components/dashboard/ActivityFeed.jsx";
import DeadlinesCalendar from "../components/dashboard/DeadlinesCalendar.jsx";
import ProjectProgressCard from "../components/dashboard/ProjectProgressCard.jsx";
import { useAuth } from "../contexts/AuthContext";
import projectService from "../services/projectService";
import taskService from "../services/taskService";

import { useProject } from "../contexts/ProjectContext";

export default function Dashboard() {
  const { user } = useAuth();
  const { currentProject, loading: projectsLoading } = useProject();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Lấy task và stats khi currentProject thay đổi
  useEffect(() => {
    if (!currentProject) return;

    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const [taskRes, statsRes] = await Promise.all([
          taskService.getProjectTasks(currentProject.id),
          taskService.getTaskStats(currentProject.id)
        ]);
        
        // Backend trả về: { status, data: [...tasks], pagination }
        setTasks(taskRes.data || []);
        setStats(statsRes);
      } catch (error) {
        console.error("Fetch project data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [currentProject]);

  const handleToggleTask = async (taskId, done) => {
    try {
      const newStatus = done ? 'DONE' : 'IN_PROGRESS';
      await taskService.updateTask(taskId, { status: newStatus });
      // Re-fetch hoặc update local state
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error("Toggle task error:", error);
    }
  };

  if (projectsLoading && !currentProject) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fcf8ff]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#4648d4] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#4648d4] font-semibold">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      taskCount={tasks.filter(t => t.status !== 'DONE').length}
    >
      <div className="mb-10">
        <h2 className="text-[32px] font-extrabold text-[#1b1b23] tracking-tight mb-2">
          Chào buổi sáng, {user?.fullname?.split(' ')[0] || "Bạn"} 👋
        </h2>
        <p className="text-[#464554] text-lg font-medium">
          Bạn có <span className="text-[#4648d4] font-bold">{tasks.filter(t => t.status !== 'DONE').length} nhiệm vụ</span> cần hoàn thành trong hôm nay.
        </p>
      </div>

      {/* Stats Row */}
      <StatsGrid statsData={stats} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 mt-10">
        {/* Left Column */}
        <div className="flex flex-col gap-8 min-w-0">
          <TaskList 
            tasks={tasks.slice(0, 5)} 
            onToggle={handleToggleTask} 
            projectName={currentProject?.title}
            progress={stats ? Math.round((stats.done / stats.total) * 100) : 0}
          />
          <WeeklyOutput />
          <ActivityFeed />
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-8">
          <DeadlinesCalendar tasks={tasks} />
          <ProjectProgressCard 
            projectName={currentProject?.title || "Dự án"} 
            progress={stats ? Math.round((stats.done / stats.total) * 100) : 0} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}