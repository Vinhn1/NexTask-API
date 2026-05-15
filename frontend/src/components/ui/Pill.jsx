import { C } from "@/constants/brand";

const variantClasses = {
  indigo: "bg-[#eef0fd] text-primary border border-[#c7c9f5]",
  amber:  "bg-[#fef3e2] text-[#b45309] border border-[#fcd38d]",
  green:  "bg-[#eaf3de] text-[#3b6d11] border border-[#c0dd97]",
  red:    "bg-[#fee2e2] text-[#b91c1c] border-none",
  white:  "bg-white/15 text-white border-none",
};

export default function Pill({ children, variant = "indigo", className = "", ...props }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}