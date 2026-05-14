import { C } from "@/constants/brand";

export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20,
      border: `1px solid ${C.border}`, ...style,
    }}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
      textTransform: "uppercase", color: C.indigo,
      display: "block", marginBottom: 12,
    }}>
      {children}
    </span>
  );
}