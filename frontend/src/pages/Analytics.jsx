import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import projectService from "../services/projectService";
import taskService from "../services/taskService";

export default function Analytics() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await projectService.getUserProjects();
        const projectList = res.data || [];
        setProjects(projectList);
        if (projectList.length > 0) {
          setCurrentProject(projectList[0]);
        }
      } catch (error) {
        console.error("Fetch initial data error:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!currentProject) return;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const statsRes = await taskService.getTaskStats(currentProject.id);
        setStats(statsRes);
      } catch (error) {
        console.error("Fetch stats error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [currentProject]);

  return (
    <DashboardLayout 
      projects={projects} 
      currentProject={currentProject} 
      onSelectProject={setCurrentProject}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1b1b23] tracking-tight">Phân tích hiệu suất</h2>
          <p className="text-[#464554] font-medium">Theo dõi dữ liệu và đánh giá hiệu quả công việc.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-[#e4e1ed] rounded-xl text-sm font-bold text-[#464554] flex items-center gap-2 hover:bg-[#fcf8ff] transition-all">
            <span className="material-symbols-rounded text-[20px]">calendar_today</span>
            7 ngày qua
          </button>
          <button className="px-4 py-2 bg-[#4648d4] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-100">
            <span className="material-symbols-rounded text-[20px]">download</span>
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productivity Chart Placeholder */}
        <div className="bg-white p-8 rounded-3xl border border-[#e4e1ed] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-extrabold text-[#1b1b23]">Năng suất hàng tuần</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+15% so với tuần trước</span>
          </div>
          <div className="h-[300px] flex items-end justify-between gap-2">
            {[45, 60, 35, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div 
                  className="w-full bg-gradient-to-t from-[#4648d4] to-[#06b6d4] rounded-t-xl transition-all duration-500 hover:opacity-80 cursor-pointer"
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-xs font-bold text-[#767586]">{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Distribution Placeholder */}
        <div className="bg-white p-8 rounded-3xl border border-[#e4e1ed] shadow-sm">
          <h3 className="text-lg font-extrabold text-[#1b1b23] mb-8">Phân bổ nhiệm vụ</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-[#1b1b23]">Thiết kế UI/UX</span>
                <span className="text-[#4648d4]">45%</span>
              </div>
              <div className="w-full h-2 bg-[#fcf8ff] rounded-full overflow-hidden">
                <div className="h-full bg-[#4648d4] rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-[#1b1b23]">Phát triển Backend</span>
                <span className="text-[#06b6d4]">30%</span>
              </div>
              <div className="w-full h-2 bg-[#fcf8ff] rounded-full overflow-hidden">
                <div className="h-full bg-[#06b6d4] rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-[#1b1b23]">Kiểm thử (QA)</span>
                <span className="text-orange-500">15%</span>
              </div>
              <div className="w-full h-2 bg-[#fcf8ff] rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-[#1b1b23]">Khác</span>
                <span className="text-[#767586]">10%</span>
              </div>
              <div className="w-full h-2 bg-[#fcf8ff] rounded-full overflow-hidden">
                <div className="h-full bg-[#767586] rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
