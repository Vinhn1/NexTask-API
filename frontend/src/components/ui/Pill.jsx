import { C } from "@/constants/brand";

const variants = {
  indigo: { background: "#eef0fd", color: C.indigo, border: "1px solid #c7c9f5" },
  amber:  { background: "#fef3e2", color: "#b45309", border: "1px solid #fcd38d" },
  green:  { background: "#eaf3de", color: "#3b6d11", border: "1px solid #c0dd97" },
  red:    { background: "#fee2e2", color: "#b91c1c", border: "none" },
  white:  { background: "rgba(255,255,255,0.15)", color: "#fff", border: "none" },
};

export default function Pill({ children, variant = "indigo", style = {} }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 14px", borderRadius: 999,
      fontSize: 11, fontWeight: 700,
      letterSpacing: "0.05em", textTransform: "uppercase",
      ...variants[variant], ...style,
    }}>
      {children}
    </span>
  );
}