import { Link } from "react-router-dom";
import { C } from "@/constants/brand";
import { BtnPrimary } from "@/components/ui/Button";

const NAV_LINKS = ["Tính năng", "Bảng giá", "Tài liệu", "Blog"];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] bg-surface/88 backdrop-blur-xl border-b border-border px-8 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
          <span className="text-white font-black text-lg">N</span>
        </div>
        <span className="font-black text-xl text-primary tracking-tight">NexTask</span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-7 text-[14px] font-semibold">
        {NAV_LINKS.map(l => (
          <a 
            key={l} 
            href="#" 
            className="text-muted no-underline transition-colors duration-150 hover:text-primary"
          >
            {l}
          </a>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">
        <Link to="/auth" className="text-[14px] font-semibold text-muted no-underline hover:text-primary transition-colors">
          Đăng nhập
        </Link>
        <Link to="/auth">
          <BtnPrimary className="px-5 py-2.5 text-[14px] rounded-xl">
            Bắt đầu miễn phí
          </BtnPrimary>
        </Link>
      </div>
    </nav>
  );
}
