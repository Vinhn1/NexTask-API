import { Check } from "lucide-react";
import { C } from "@/constants/brand";

export default function KanbanCol({ title, count, dot, titleColor, countBg, countColor, cards }) {
  return (
    <div style={{ background: "#f8f6ff", borderRadius: 12, padding: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: titleColor, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: dot }} />
        {title}
        <span style={{ background: countBg, borderRadius: 999, padding: "1px 7px", fontSize: 10, color: countColor }}>{count}</span>
      </div>

      {cards.map((card, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 8,
          border: card.bordered ? `1px solid ${C.indigo}` : `1px solid ${C.border}`,
          boxShadow: card.bordered ? `0 0 0 1px ${C.indigo}20` : undefined,
          padding: 9, marginBottom: 6, opacity: card.done ? 0.7 : 1,
        }}>
          {card.badge && <div style={{ marginBottom: 6 }}>{card.badge}</div>}
          <div style={{
            fontSize: 11, fontWeight: 600,
            color: card.done ? "#888" : "#1b1b23",
            textDecoration: card.done ? "line-through" : "none",
          }}>
            {card.title}
          </div>
          {card.done && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
              <Check size={12} color="#10b981" />
              <span style={{ fontSize: 10, color: "#10b981", fontWeight: 600 }}>Completed</span>
            </div>
          )}
          {card.sub && <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>{card.sub}</div>}
          {card.extra}
        </div>
      ))}
    </div>
  );
}