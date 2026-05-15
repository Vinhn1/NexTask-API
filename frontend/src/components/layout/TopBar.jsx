import { useAuth } from "../../contexts/AuthContext";

export default function TopBar({ taskCount = 0 }) {
  const { user } = useAuth();

  // Lấy chữ cái đầu của tên
  const initials = user?.fullname
    ? user.fullname.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "NT";

  const firstName = user?.fullname?.split(" ")[0] || "Bạn";

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#c7c4d7] bg-[#fcf8ff]">
      {/* Left: Greeting */}
      <div>
        <h1 className="text-xl font-bold text-[#1b1b23]">Chào buổi sáng, {firstName}! 👋</h1>
        <p className="text-sm text-[#767586] mt-0.5">
          Bạn có <span className="font-semibold text-[#4648d4]">{taskCount} nhiệm vụ</span> cần hoàn thành hôm nay
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Pro Badge */}
        <div className="flex items-center gap-1.5 bg-[#ffdcc5] text-[#703700] px-3 py-1.5 rounded-full text-sm font-semibold">
          <span className="material-symbols-rounded text-base leading-none">workspace_premium</span>
          Gói Pro
        </div>

        {/* Icon Buttons */}
        {[
          { icon: "notifications", label: "Thông báo" },
          { icon: "help", label: "Trợ giúp" },
          { icon: "settings", label: "Cài đặt" },
        ].map(({ icon, label }) => (
          <button
            key={icon}
            aria-label={label}
            className="w-9 h-9 rounded-xl border border-[#c7c4d7] bg-transparent text-[#464554] flex items-center justify-center hover:bg-[#e9e6f3] transition-colors"
          >
            <span className="material-symbols-rounded text-xl leading-none">{icon}</span>
          </button>
        ))}

        {/* Avatar */}
        <div
          title={user?.fullname || "Người dùng"}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4648d4] to-[#57dffe] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 cursor-pointer"
        >
          {initials}
        </div>
      </div>
    </header>
  );
}