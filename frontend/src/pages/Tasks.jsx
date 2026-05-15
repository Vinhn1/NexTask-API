import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import taskService from "../services/taskService";
import projectService from "../services/projectService";
import { useAuth } from "../contexts/AuthContext";
import TaskBoard from "../components/tasks/TaskBoard.jsx";
import TaskDetailSidebar from "../components/tasks/TaskDetailSidebar.jsx";
import TaskForm from "../components/tasks/TaskForm.jsx";
import ProjectForm from "../components/projects/ProjectForm.jsx";
import ProjectMemberForm from "../components/projects/ProjectMemberForm.jsx";

export default function Tasks() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);

  // Phân biệt Owner: Nếu người dùng hiện tại là người tạo dự án
  const isOwner = currentProject && user && currentProject.ownerId === user.id;

  const fetchProjects = async () => {
    try {
      const res = await projectService.getUserProjects();
      const projectList = res.data?.projects || [];
      setProjects(projectList);
      if (projectList.length > 0 && !currentProject) {
        setCurrentProject(projectList[0]);
      } else if (projectList.length > 0 && currentProject) {
        // Cập nhật lại currentProject nếu nó đã tồn tại trong list mới
        const updated = projectList.find(p => p.id === currentProject.id);
        if (updated) setCurrentProject(updated);
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

  const handleTaskCreated = (newTask) => {
    if (currentProject && newTask.projectId === currentProject.id) {
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
  };

  const handleMemberAdded = (updatedProject) => {
    // Cập nhật lại danh sách projects và currentProject với data mới nhất (có members mới)
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    setCurrentProject(updatedProject);
  };

  const handleCreateMockData = async () => {
    setLoading(true);
    try {
      const newProjectRes = await projectService.createProject({
        title: 'Product Development Board',
        description: 'Bảng theo dõi tiến độ phát triển sản phẩm mẫu.',
      });
      
      const newProject = newProjectRes.data?.project || newProjectRes.data || newProjectRes;
      const projectId = newProject.id;

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
        }
      ];

      for (const task of tasksToCreate) {
        await taskService.createTask(task);
      }

      await fetchProjects();
    } catch (error) {
      console.error("Lỗi khi tạo dữ liệu mẫu:", error);
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
      onNewTaskClick={() => isOwner && setIsTaskFormOpen(true)}
      onNewProjectClick={() => setIsProjectFormOpen(true)}
      isOwner={isOwner}
    >
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 flex-shrink-0">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-[32px] font-extrabold text-[#1b1b23] tracking-tight flex items-center gap-3">
                {currentProject ? currentProject.title : 'Bảng nhiệm vụ'}
                {isOwner && (
                  <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-bold uppercase tracking-wider">Owner</span>
                )}
              </h2>
              {/* Avatar stack dynamic */}
              {currentProject && (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex -space-x-2">
                    {/* Chủ sở hữu luôn hiện đầu tiên */}
                    <div 
                      title={`Owner: ${currentProject.owner?.fullname || 'N/A'}`}
                      className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white z-30"
                    >
                      {currentProject.owner?.fullname?.charAt(0).toUpperCase() || 'O'}
                    </div>
                    
                    {/* Danh sách thành viên (tối đa 3 người hiện avatar) */}
                    {currentProject.members?.slice(0, 3).map((member, idx) => (
                      <div 
                        key={member.id}
                        title={member.fullname}
                        className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 z-20"
                        style={{ zIndex: 20 - idx }}
                      >
                        {member.avatar ? (
                          <img src={member.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          member.fullname?.charAt(0).toUpperCase() || 'M'
                        )}
                      </div>
                    ))}
                    
                    {/* Số lượng còn lại */}
                    {currentProject.members?.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-[#e1e0ff] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#4648d4] z-0">
                        +{currentProject.members.length - 3}
                      </div>
                    )}
                  </div>
                  {isOwner && (
                    <button 
                      onClick={() => setIsMemberFormOpen(true)}
                      className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#4648d4] hover:text-[#4648d4] transition-all group"
                    >
                      <span className="material-symbols-rounded text-lg group-hover:scale-110 transition-transform">person_add</span>
                    </button>
                  )}
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
            {isOwner && (
              <button 
                onClick={() => setIsTaskFormOpen(true)}
                className="px-5 py-3 bg-[#4648d4] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-200 flex-shrink-0"
              >
                <span className="material-symbols-rounded text-[20px]">add</span>
                Thêm nhiệm vụ
              </button>
            )}
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
                  <button onClick={() => setIsProjectFormOpen(true)} className="px-6 py-3 bg-[#4648d4] text-white rounded-xl font-bold hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-200 mt-2 flex items-center gap-2">
                    <span className="material-symbols-rounded text-[20px]">add</span>
                    Tạo dự án mới ngay
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

          <TaskForm 
            isOpen={isTaskFormOpen} 
            onClose={() => setIsTaskFormOpen(false)}
            projectId={currentProject?.id}
            onTaskCreated={handleTaskCreated}
            projectMembers={currentProject ? [currentProject.owner, ...(currentProject.members || [])] : []}
          />

          <ProjectForm
            isOpen={isProjectFormOpen}
            onClose={() => setIsProjectFormOpen(false)}
            onProjectCreated={handleProjectCreated}
          />

          <ProjectMemberForm
            isOpen={isMemberFormOpen}
            onClose={() => setIsMemberFormOpen(false)}
            projectId={currentProject?.id}
            onMemberAdded={handleMemberAdded}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

