import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import taskService from "../services/taskService";
import projectService from "../services/projectService";
import { useAuth } from "../contexts/AuthContext";
import TaskBoard from "../components/tasks/TaskBoard.jsx";
import TaskDetailSidebar from "../components/tasks/TaskDetailSidebar.jsx";

export default function Tasks() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await projectService.getUserProjects();
      const projectList = res.data || [];
      setProjects(projectList);
      if (projectList.length > 0) {
        setCurrentProject(projectList[0]);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetch projects error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!currentProject) return;
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await taskService.getProjectTasks(currentProject.id);
        setTasks(res.data || []);
      } catch (error) {
        console.error("Fetch tasks error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [currentProject]);

  const handleCreateMockData = async () => {
    setLoading(true);
    try {
      // 1. Tạo dự án mẫu
      const newProjectRes = await projectService.createProject({
        title: 'Product Development Board',
        description: 'Bảng theo dõi tiến độ phát triển sản phẩm mẫu.',
      });
      
      const newProject = newProjectRes.data || newProjectRes;
      const projectId = newProject.id || newProject._id;

      // 2. Tạo các nhiệm vụ mẫu cho dự án
      const tasksToCreate = [
        {
          title: 'API Infrastructure Migration to GraphQL',
          status: 'TODO',
          priority: 'HIGH',
          dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
          description: 'Cần chuyển đổi toàn bộ REST API sang GraphQL.\n\nMục tiêu:\n- Đánh giá các endpoint hiện tại\n- Xây dựng schema\n- Viết resolver',
          projectId: projectId
        },
        {
          title: 'Design System Token Audit & Sync',
          status: 'IN_PROGRESS',
          priority: 'MEDIUM',
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
          description: 'Đồng bộ hóa Design System với Tailwind CSS.\n\nMục tiêu:\n- Cập nhật colors\n- Tối ưu typography\n- Test component library',
          projectId: projectId
        },
        {
          title: 'Dark Mode Theme Refinement',
          status: 'TODO',
          priority: 'LOW',
          description: 'Sửa lỗi màu sắc không tương phản khi bật Dark Mode.',
          projectId: projectId
        },
        {
          title: 'Mobile Responsive Dashboards',
          status: 'DONE',
          priority: 'HIGH',
          dueDate: new Date(Date.now() - 86400000 * 1).toISOString(),
          description: 'Tối ưu UI cho mobile.\n\nĐã hoàn thành:\n- Sidebar collapse\n- Stack card layout',
          projectId: projectId
        }
      ];

      for (const task of tasksToCreate) {
        await taskService.createTask(task);
      }

      // Tải lại dữ liệu sau khi tạo
      await fetchProjects();
    } catch (error) {
      console.error("Lỗi khi tạo dữ liệu mẫu:", error);
      alert("Có lỗi xảy ra khi tạo dữ liệu mẫu. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (!searchQuery) return true;
    return t.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <DashboardLayout 
      projects={projects} 
      currentProject={currentProject} 
      onSelectProject={setCurrentProject}
    >
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 flex-shrink-0">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-[32px] font-extrabold text-[#1b1b23] tracking-tight">
                {currentProject ? currentProject.title : 'Bảng nhiệm vụ'}
              </h2>
              {/* Avatar stack mockup */}
              {currentProject && (
                <div className="hidden sm:flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-700">A</div>
                  <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-xs font-bold text-pink-700">B</div>
                  <div className="w-8 h-8 rounded-full bg-[#6063ee] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">+12</div>
                </div>
              )}
            </div>
            <p className="text-[#464554] font-medium text-lg">Quản lý và theo dõi tiến độ công việc dự án.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-[#767586] text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Tìm kiếm nhiệm vụ..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-3 bg-white border border-[#e4e1ed] rounded-xl text-sm font-medium w-full md:w-64 focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff] transition-all shadow-sm placeholder:text-[#767586]"
              />
            </div>
            <button className="px-5 py-3 bg-[#4648d4] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-200 flex-shrink-0">
              <span className="material-symbols-rounded text-[20px]">add</span>
              Thêm nhiệm vụ
            </button>
          </div>
        </div>

        {/* Board Area */}
        <div className="flex-1 overflow-hidden flex relative -mx-2 px-2 pb-2">
          <div className="flex-1 overflow-x-auto h-full custom-scrollbar pr-4">
             {loading ? (
                <div className="flex items-center justify-center h-full text-[#767586] font-medium text-lg flex-col gap-4">
                  <span className="material-symbols-rounded animate-spin text-[32px] text-[#4648d4]">refresh</span>
                  Đang tải dữ liệu bảng...
                </div>
             ) : projects.length === 0 ? (
                <div className="flex items-center justify-center h-full text-[#767586] font-medium text-lg flex-col gap-4">
                  <span className="material-symbols-rounded text-[64px] text-[#e4e1ed]">dashboard_customize</span>
                  <p>Bạn chưa có dự án nào để bắt đầu công việc.</p>
                  <button onClick={handleCreateMockData} className="px-6 py-3 bg-[#4648d4] text-white rounded-xl font-bold hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-200 mt-2 flex items-center gap-2">
                    <span className="material-symbols-rounded text-[20px]">magic_button</span>
                    Tạo dự án mẫu tự động
                  </button>
                </div>
             ) : (
                <TaskBoard 
                  tasks={filteredTasks} 
                  onTaskClick={setSelectedTask} 
                  selectedTaskId={selectedTask?.id} 
                />
             )}
          </div>
          
          {selectedTask && (
            <TaskDetailSidebar 
              task={selectedTask} 
              project={currentProject} 
              onClose={() => setSelectedTask(null)} 
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
