import { useState, useEffect, useCallback } from "react";
import projectService from "../../services/projectService";
import { toast } from "react-hot-toast";

export default function ProjectMemberForm({ isOpen, onClose, projectId, onMemberAdded }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const fetchMembers = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await projectService.getMembers(projectId);
      setMembers(res.data.members || []);
    } catch (error) {
      console.error("Fetch members error:", error);
    } finally {
      setFetchLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (isOpen && projectId) {
      const timeoutId = window.setTimeout(fetchMembers, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [isOpen, projectId, fetchMembers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await projectService.addMember(projectId, email);
      toast.success("Thêm thành viên thành công!");
      setEmail("");
      // Refresh members list
      fetchMembers();
      if (onMemberAdded) onMemberAdded(res.data.project);
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi thêm thành viên");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-[28px] w-full max-w-md relative z-10 shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#1b1b23] tracking-tight">Thành viên dự án</h2>
              <p className="text-[#767586] text-sm font-medium mt-1">Mời mọi người cùng tham gia dự án.</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <span className="material-symbols-rounded">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#1b1b23] uppercase tracking-widest mb-3 ml-1">
                Email người dùng
              </label>
              <div className="relative group">
                <span className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4648d4] transition-colors">
                  mail
                </span>
                <input 
                  autoFocus
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#4648d4] focus:ring-4 focus:ring-[#4648d4]/10 transition-all placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#4648d4] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#3537c0] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="material-symbols-rounded animate-spin">refresh</span>
              ) : (
                <>
                  <span className="material-symbols-rounded text-xl">person_add</span>
                  Thêm vào dự án
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <h3 className="text-xs font-bold text-[#1b1b23] uppercase tracking-widest mb-5 ml-1">
              Thành viên hiện tại ({members.length})
            </h3>
            
            <div className="space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
              {fetchLoading ? (
                <div className="flex items-center justify-center py-4 text-slate-400">
                  <span className="material-symbols-rounded animate-spin mr-2">refresh</span>
                  Đang tải...
                </div>
              ) : members.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">Chưa có thành viên nào khác.</p>
              ) : (
                members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.fullname} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          (member.fullname || member.email).charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1b1b23]">{member.fullname || 'Người dùng'}</p>
                        <p className="text-xs text-slate-500 font-medium">{member.email}</p>
                      </div>
                    </div>
                    {/* Placeholder for remove member action - only owner can do this */}
                    <button className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                      <span className="material-symbols-rounded text-lg">person_remove</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
