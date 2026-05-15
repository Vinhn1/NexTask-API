import { C } from "@/constants/brand";

export function Card({ children, className = "", ...props }) {
  return (
    <div className={`bg-white rounded-[20px] border border-border ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SectionLabel({ children, className = "", ...props }) {
  return (
    <span className={`text-[12px] font-bold tracking-[0.15em] uppercase text-primary block mb-3 ${className}`} {...props}>
      {children}
    </span>
  );
}