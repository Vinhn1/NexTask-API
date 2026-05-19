import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import projectService from "../services/projectService";
import userService from "../services/userService";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  // ProtectedRoute redirect về '/' khi user=null → tự động về trang chủ
  const handleLogout = () => logout();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    bio: user?.bio || "",
    jobTitle: user?.jobTitle || "",
    department: user?.department || "",
  });

  useEffect(() => {
    setFormData({
      fullname: user?.fullname || "",
      bio: user?.bio || "",
      jobTitle: user?.jobTitle || "",
      department: user?.department || "",
    });
  }, [user]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectService.getUserProjects();
        const projectList = res.data?.projects || [];
        setProjects(projectList);
        setCurrentProject(projectList[0] || null);
      } catch (error) {
        console.error("Fetch projects error:", error);
      }
    };

    fetchProjects();
  }, []);

  const initials = user?.fullname
    ? user.fullname
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "NT";

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        fullname: formData.fullname.trim(),
        bio: formData.bio.trim() || null,
        jobTitle: formData.jobTitle.trim() || null,
        department: formData.department.trim() || null,
      };

      const response = await userService.updateProfile(payload);
      updateUser(response.data);
      toast.success("Đã cập nhật hồ sơ");
    } catch (error) {
      toast.error(error.response?.data?.message || "Không thể cập nhật hồ sơ");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await userService.updateAvatar(file);
      updateUser(response.data);
      toast.success("Đã cập nhật ảnh đại diện");
    } catch (error) {
      toast.error(error.response?.data?.message || "Không thể tải ảnh đại diện");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <DashboardLayout
      projects={projects}
      currentProject={currentProject}
      onSelectProject={setCurrentProject}
      onNewTaskClick={() => {}}
      onNewProjectClick={() => {}}
      isOwner={false}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#767586] mb-2">Tài khoản</p>
            <h2 className="text-[32px] font-extrabold text-[#1b1b23] tracking-tight">Hồ sơ cá nhân</h2>
            <p className="text-[#464554] font-medium text-base mt-2">
              Quản lý thông tin cá nhân, ảnh đại diện và thông tin hiển thị trong workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#ffdad6] text-[#93000a] bg-white hover:bg-[#fff0f0] font-bold transition-colors"
          >
            <span className="material-symbols-rounded text-[20px]">logout</span>
            Đăng xuất
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <section className="bg-white border border-[#e4e1ed] rounded-2xl p-6 shadow-sm h-fit">
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-[32px] bg-gradient-to-br from-[#4648d4] to-[#57dffe] text-white flex items-center justify-center text-4xl font-black shadow-xl shadow-indigo-100 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : initials}
              </div>

              <label className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#4648d4] text-white font-bold text-sm hover:bg-[#3537c0] transition-colors cursor-pointer">
                <span className={`material-symbols-rounded text-[18px] ${uploading ? "animate-spin" : ""}`}>
                  {uploading ? "refresh" : "photo_camera"}
                </span>
                {uploading ? "Đang tải lên" : "Đổi ảnh đại diện"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={uploading}
                />
              </label>

              <div className="mt-6 w-full text-left space-y-3">
                <InfoRow icon="mail" label="Email" value={user?.email || "-"} />
                <InfoRow icon="verified_user" label="Vai trò" value={user?.role || "-"} />
                <InfoRow
                  icon="calendar_month"
                  label="Ngày tham gia"
                  value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "-"}
                />
              </div>
            </div>
          </section>

          <form onSubmit={handleSubmit} className="bg-white border border-[#e4e1ed] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#f2effb]">
              <div>
                <h3 className="text-xl font-extrabold text-[#1b1b23]">Thông tin cá nhân</h3>
                <p className="text-sm text-[#767586] mt-1">Cập nhật thông tin hiển thị cho đội nhóm.</p>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#4648d4] text-white font-bold hover:bg-[#3537c0] disabled:opacity-50 transition-colors"
              >
                <span className={`material-symbols-rounded text-[20px] ${saving ? "animate-spin" : ""}`}>
                  {saving ? "refresh" : "save"}
                </span>
                {saving ? "Đang lưu" : "Lưu thay đổi"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <Field label="Họ tên">
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange("fullname")}
                  minLength={2}
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-xl text-sm font-semibold text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff]"
                />
              </Field>

              <Field label="Chức danh">
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={handleChange("jobTitle")}
                  placeholder="Product Manager"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-xl text-sm font-semibold text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff]"
                />
              </Field>

              <Field label="Phòng ban">
                <input
                  type="text"
                  value={formData.department}
                  onChange={handleChange("department")}
                  placeholder="Engineering"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-xl text-sm font-semibold text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff]"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 bg-[#f2effb] border border-[#e4e1ed] rounded-xl text-sm font-semibold text-[#767586]"
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Giới thiệu">
                <textarea
                  rows={6}
                  value={formData.bio}
                  onChange={handleChange("bio")}
                  placeholder="Viết ngắn gọn về vai trò, kinh nghiệm hoặc mục tiêu hiện tại."
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-xl text-sm font-semibold text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff] resize-none"
                />
              </Field>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-[#767586] uppercase tracking-wider mb-2">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-[#fcf8ff] border border-[#f2effb] rounded-xl">
      <span className="material-symbols-rounded text-[18px] text-[#4648d4]">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#767586]">{label}</p>
        <p className="text-sm font-semibold text-[#1b1b23] truncate">{value}</p>
      </div>
    </div>
  );
}
