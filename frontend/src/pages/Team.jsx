import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import { useProject } from "../contexts/ProjectContext";
import projectService from "../services/projectService";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

export default function Team() {
  const { currentProject, loading: projectLoading } = useProject();
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!currentProject?.id) return;
      try {
        setLoading(true);
        const res = await projectService.getMembers(currentProject.id);
        setMembers(res.data.members);
        setOwner(res.data.owner);
      } catch (error) {
        console.error("Fetch members error:", error);
        toast.error("Không thể tải danh sách thành viên");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [currentProject]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    try {
      setIsInviting(true);
      await projectService.addMember(currentProject.id, inviteEmail);
      toast.success("Đã thêm thành viên thành công!");
      setInviteEmail("");
      // Refresh members list
      const res = await projectService.getMembers(currentProject.id);
      setMembers(res.data.members);
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi thêm thành viên");
    } finally {
      setIsInviting(false);
    }
  };

  const isOwner = user?.id === currentProject?.ownerId;

  return (
    <DashboardLayout isOwner={isOwner}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1b1b23] tracking-tight">Đội nhóm</h2>
          <p className="text-[#464554] font-medium">Quản lý thành viên và quyền truy cập cho dự án: <span className="text-[#4648d4] font-bold">{currentProject?.title}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Members List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-[#e4e1ed] overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-[#f0eff5] flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1b1b23]">Thành viên dự án</h3>
              <span className="bg-[#e1e0ff] text-[#4648d4] text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                {members.length + (owner ? 1 : 0)} Người
              </span>
            </div>
            
            <div className="divide-y divide-[#f0eff5]">
              {loading || projectLoading ? (
                <div className="p-12 text-center text-[#767586]">Đang tải danh sách...</div>
              ) : (
                <>
                  {/* Owner Row */}
                  {owner && (
                    <div className="px-6 py-4 flex items-center justify-between hover:bg-[#fcf8ff] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {owner.avatar ? (
                            <img src={owner.avatar} alt={owner.fullname} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-50" />
                          ) : (
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4648d4] to-[#57dffe] flex items-center justify-center text-white font-bold text-lg">
                              {owner.fullname?.charAt(0)}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4648d4] border-2 border-white flex items-center justify-center shadow-sm">
                            <span className="material-symbols-rounded text-white text-[12px]">grade</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-extrabold text-[#1b1b23] flex items-center gap-2">
                            {owner.fullname}
                            <span className="text-[10px] bg-[#4648d4] text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider">Trưởng nhóm</span>
                          </p>
                          <p className="text-sm text-[#767586]">{owner.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-[#767586]">Toàn quyền</span>
                      </div>
                    </div>
                  )}

                  {/* Members Rows */}
                  {members.map((member) => (
                    <div key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#fcf8ff] transition-colors group">
                      <div className="flex items-center gap-4">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.fullname} className="w-12 h-12 rounded-2xl object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-[#e1e0ff] text-[#4648d4] flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-105">
                            {member.fullname?.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-extrabold text-[#1b1b23]">{member.fullname}</p>
                          <p className="text-sm text-[#767586]">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-[#464554] bg-[#f5f2fe] px-2 py-1 rounded-lg">Biên tập viên</span>
                        {isOwner && (
                          <button className="w-8 h-8 flex items-center justify-center rounded-xl text-[#767586] hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                            <span className="material-symbols-rounded text-lg">person_remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {members.length === 0 && !loading && (
                    <div className="p-8 text-center bg-[#fcf8ff]/50">
                      <p className="text-[#767586] text-sm italic">Chưa có thành viên nào khác trong dự án này.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Invite Form */}
          {isOwner && (
            <div className="bg-white rounded-3xl border border-[#e4e1ed] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#1b1b23] mb-4 flex items-center gap-2">
                <span className="material-symbols-rounded text-[#4648d4]">person_add</span>
                Mời thành viên
              </h3>
              <p className="text-sm text-[#767586] mb-4">Nhập email của người bạn muốn mời tham gia vào dự án này.</p>
              
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-rounded text-[#767586] text-lg">mail</span>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#f5f2fe] border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#4648d4] transition-all outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isInviting || !inviteEmail}
                  className="w-full py-3 bg-[#4648d4] hover:bg-[#3537c0] disabled:bg-[#c7c4d7] text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-100"
                >
                  {isInviting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="material-symbols-rounded text-lg">send</span>
                      Gửi lời mời
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Stats / Info Card */}
          <div className="bg-gradient-to-br from-[#4648d4] to-[#6366f1] rounded-3xl p-6 text-white shadow-lg shadow-indigo-100">
            <h4 className="font-bold text-lg mb-2">Lời khuyên cho Đội nhóm</h4>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Việc cộng tác hiệu quả bắt đầu từ việc phân chia vai trò rõ ràng. Hãy mời đồng nghiệp để bắt đầu giao việc ngay hôm nay!
            </p>
            <div className="flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
              <span className="material-symbols-rounded text-sm">info</span>
              Bạn đang sử dụng gói Pro
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
