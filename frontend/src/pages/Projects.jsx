import { useState } from "react";
import { useProject } from "../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import ProjectForm from "../components/projects/ProjectForm.jsx";

export default function Projects() {
  const { projects, loading, refreshProjects, currentProject } = useProject();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isOwner = (project) => currentProject?.ownerId === project.ownerId;

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard?projectId=${projectId}`);
  };

  const handleProjectCreated = (newProject) => {
    refreshProjects();
    navigate(`/dashboard?projectId=${newProject.id}`);
  };

  return (
    <DashboardLayout>
      <ProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1b1b23] tracking-tight">Dự án của tôi</h2>
          <p className="text-[#464554] font-medium">Tổ chức các nhiệm vụ theo dự án để quản lý dễ dàng hơn.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-5 py-2.5 bg-[#4648d4] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-100"
        >
          <span className="material-symbols-rounded text-[20px]">create_new_folder</span>
          Dự án mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-[#767586]">Đang tải dữ liệu...</div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className="bg-white p-6 rounded-3xl border border-[#e4e1ed] hover:border-[#4648d4] hover:shadow-xl hover:shadow-indigo-50/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e1e0ff] flex items-center justify-center text-[#4648d4]">
                  <span className="material-symbols-rounded text-[24px]">folder</span>
                </div>
                <div className="flex items-center gap-1">
                  {project.ownerId && (
                    <span className="text-[10px] bg-[#f5f2fe] text-[#4648d4] border border-[#e1e0ff] px-2 py-0.5 rounded-full font-semibold">
                      {project.owner?.fullname?.split(" ").pop() ?? "Owner"}
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-extrabold text-[#1b1b23] group-hover:text-[#4648d4] transition-colors mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-[#464554] mb-6 line-clamp-2 min-h-[40px]">
                {project.description || "Không có mô tả cho dự án này."}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#e4e1ed]">
                <div className="flex -space-x-2">
                  {/* Owner avatar */}
                  {project.owner && (
                    project.owner.avatar ? (
                      <img
                        src={project.owner.avatar}
                        alt={project.owner.fullname}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        title={project.owner.fullname}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600" title={project.owner.fullname}>
                        {project.owner.fullname?.charAt(0)?.toUpperCase()}
                      </div>
                    )
                  )}
                  {/* Member count badge */}
                  {project.members?.length > 0 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-cyan-100 flex items-center justify-center text-[10px] font-bold text-cyan-600">
                      +{project.members.length}
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-[#4648d4] bg-[#e1e0ff] px-2 py-1 rounded-lg">
                  {project.tasks?.length ?? 0} task
                </span>
              </div>
            </div>
          ))
        ) : (
          <div
            onClick={() => setIsFormOpen(true)}
            className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-[#c7c4d7] hover:border-[#4648d4] hover:bg-[#fcf8ff] transition-all cursor-pointer group"
          >
            <span className="material-symbols-rounded text-[48px] text-[#c7c4d7] group-hover:text-[#4648d4] transition-colors mb-2 block">create_new_folder</span>
            <p className="text-[#767586] font-medium group-hover:text-[#4648d4] transition-colors">
              Bạn chưa có dự án nào. Click để tạo dự án đầu tiên!
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
