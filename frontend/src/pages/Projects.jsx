import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import projectService from "../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectService.getUserProjects();
        // Backend trả về: { status, result, data: { projects: [...] } }
        const projectList = res.data?.projects || [];
        setProjects(projectList);
        if (projectList.length > 0) {
          setCurrentProject(projectList[0]);
        }
      } catch (error) {
        console.error("Fetch projects error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <DashboardLayout 
      projects={projects} 
      currentProject={currentProject} 
      onSelectProject={setCurrentProject}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1b1b23] tracking-tight">Dự án của tôi</h2>
          <p className="text-[#464554] font-medium">Tổ chức các nhiệm vụ theo dự án để quản lý dễ dàng hơn.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#4648d4] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-100">
          <span className="material-symbols-outlined text-[20px]">create_new_folder</span>
          Dự án mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-[#767586]">Đang tải dữ liệu...</div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-3xl border border-[#e4e1ed] hover:border-[#4648d4] hover:shadow-xl hover:shadow-indigo-50/50 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e1e0ff] flex items-center justify-center text-[#4648d4]">
                  <span className="material-symbols-outlined text-[24px]">folder</span>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#fcf8ff] text-[#767586]">
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
              <h3 className="text-lg font-extrabold text-[#1b1b23] group-hover:text-[#4648d4] transition-colors mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-[#464554] mb-6 line-clamp-2 min-h-[40px]">
                {project.description || "Không có mô tả cho dự án này."}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#e4e1ed]">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">V</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-cyan-100 flex items-center justify-center text-[10px] font-bold text-cyan-600">+</div>
                </div>
                <span className="text-xs font-bold text-[#4648d4] bg-[#e1e0ff] px-2 py-1 rounded-lg">
                  75% Hoàn thành
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-[#c7c4d7]">
            <span className="material-symbols-outlined text-[48px] text-[#c7c4d7] mb-2">folder_off</span>
            <p className="text-[#767586] font-medium">Bạn chưa có dự án nào. Hãy tạo dự án đầu tiên!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
