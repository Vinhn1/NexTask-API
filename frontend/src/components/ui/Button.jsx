export function BtnPrimary({ children, className = "", href = "#", ...props }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-[30px] py-[15px] bg-primary text-white font-bold text-[15px] rounded-[14px] no-underline transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(70,72,212,0.35)] ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function BtnGhost({ children, className = "", href = "#", ...props }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-[15px] bg-transparent text-dark font-semibold text-[15px] rounded-[14px] no-underline border-[1.5px] border-border transition-all duration-150 hover:bg-subtle hover:border-primary hover:text-primary ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
