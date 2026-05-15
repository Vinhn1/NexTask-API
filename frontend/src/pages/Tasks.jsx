import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import taskService from "../services/taskService";
import projectService from "../services/projectService";
import { useAuth } from "../contexts/AuthContext";

export default function Tasks() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, TODO, IN_PROGRESS, DONE

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectService.getUserProjects();
        const projectList = res.data || [];
        setProjects(projectList);
        if (projectList.length > 0) {
          setCurrentProject(projectList[0]);
        }
      } catch (error) {
        console.error("Fetch projects error:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!currentProject) return;
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await taskService.getProjectTasks(currentProject.id);
        setTasks(res.data.tasks || []);
      } catch (error) {
        console.error("Fetch tasks error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [currentProject]);

  const filteredTasks = tasks.filter(t => {
    if (filter === 'ALL') return true;
    return t.status === filter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return { bg: '#ffdad6', text: '#93000a', label: 'Cao' };
      case 'MEDIUM': return { bg: '#e1e0ff', text: '#3537c0', label: 'Trung bình' };
      default: return { bg: '#e2e2e6', text: '#464554', label: 'Thấp' };
    }
  };

  return (
    <DashboardLayout 
      projects={projects} 
      currentProject={currentProject} 
      onSelectProject={setCurrentProject}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1b1b23] tracking-tight">Danh sách nhiệm vụ</h2>
          <p className="text-[#464554] font-medium">Quản lý và theo dõi tiến độ công việc của bạn.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#4648d4] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-100">
          <span className="material-symbols-rounded text-[20px]">add</span>
          Thêm nhiệm vụ
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#e4e1ed] overflow-hidden shadow-sm">
        {/* Filters */}
        <div className="flex items-center gap-6 px-6 py-4 border-b border-[#e4e1ed] bg-[#fcf8ff]/50">
          {['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-bold transition-all pb-1 border-b-2 ${
                filter === f ? "text-[#4648d4] border-[#4648d4]" : "text-[#767586] border-transparent hover:text-[#464554]"
              }`}
            >
              {f === 'ALL' ? 'Tất cả' : f === 'TODO' ? 'Cần làm' : f === 'IN_PROGRESS' ? 'Đang làm' : 'Hoàn thành'}
            </button>
          ))}
        </div>

        {/* Task Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fcf8ff]/30 text-[#767586] text-[13px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Nhiệm vụ</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Ưu tiên</th>
                <th className="px-6 py-4">Hạn chót</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e1ed]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-[#767586]">Đang tải dữ liệu...</td>
                </tr>
              ) : filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const prio = getPriorityColor(task.priority);
                  return (
                    <tr key={task.id} className="hover:bg-[#fcf8ff] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#1b1b23] group-hover:text-[#4648d4] transition-colors">{task.title}</span>
                          <span className="text-xs text-[#767586] mt-0.5">{currentProject?.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          task.status === 'DONE' ? 'bg-green-100 text-green-700' : 
                          task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.status === 'DONE' ? 'Hoàn thành' : task.status === 'IN_PROGRESS' ? 'Đang làm' : 'Cần làm'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ backgroundColor: prio.bg, color: prio.text }}>
                          {prio.label}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-[#464554] font-medium">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('vi-VN') : '---'}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white border border-transparent hover:border-[#e4e1ed] transition-all text-[#767586] hover:text-[#4648d4]">
                            <span className="material-symbols-rounded text-[18px]">edit</span>
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white border border-transparent hover:border-[#e4e1ed] transition-all text-[#767586] hover:text-red-500">
                            <span className="material-symbols-rounded text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-[#767586]">Không tìm thấy nhiệm vụ nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
