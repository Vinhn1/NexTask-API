import { Link } from "react-router-dom";
import { BtnPrimary } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Tính năng", href: "#features" },
  { label: "Bảng giá",  href: "#pricing"  },
  { label: "Về chúng tôi", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleScroll(e, href)}
            className="text-muted no-underline transition-colors duration-150 hover:text-primary"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">
        <Link to="/auth?mode=login" className="text-[14px] font-semibold text-muted no-underline hover:text-primary transition-colors">
          Đăng nhập
        </Link>
        <BtnPrimary href="/auth?mode=signup" className="px-5 py-2.5 text-[14px] rounded-xl">
          Bắt đầu miễn phí
        </BtnPrimary>
      </div>
    </nav>
  );
}
