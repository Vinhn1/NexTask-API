import { C } from "@/constants/brand";

export function BtnPrimary({ children, style = {}, href = "#" }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "15px 30px", background: C.indigo, color: "#fff",
        fontWeight: 700, fontSize: 15, borderRadius: 14, textDecoration: "none",
        transition: "transform 0.15s, box-shadow 0.15s", ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(70,72,212,0.35)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {children}
    </a>
  );
}

export function BtnGhost({ children, style = {}, href = "#" }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "15px 24px", background: "transparent", color: C.dark,
        fontWeight: 600, fontSize: 15, borderRadius: 14, textDecoration: "none",
        border: `1.5px solid ${C.border}`, transition: "all 0.15s", ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#f5f2fe";
        e.currentTarget.style.borderColor = C.indigo;
        e.currentTarget.style.color = C.indigo;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.color = C.dark;
      }}
    >
      {children}
    </a>
  );
}