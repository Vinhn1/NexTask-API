import { Check } from "lucide-react";
import { C } from "@/constants/brand";

export default function KanbanCol({ title, count, dot, titleColor, countBg, countColor, cards }) {
  return (
    <div className="bg-subtle/50 rounded-xl p-2.5">
      <div 
        className="text-[11px] font-bold mb-2 flex items-center gap-1.5" 
        style={{ color: titleColor }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
        {title}
        <span 
          className="rounded-full px-1.5 py-0.5 text-[10px]" 
          style={{ backgroundColor: countBg, color: countColor }}
        >
          {count}
        </span>
      </div>

      {cards.map((card, i) => (
        <div 
          key={i} 
          className={`bg-white rounded-lg p-2.5 mb-1.5 border transition-all ${card.bordered ? "border-primary shadow-[0_0_0_1px_rgba(70,72,212,0.12)]" : "border-border"} ${card.done ? "opacity-70" : "opacity-100"}`}
        >
          {card.badge && <div className="mb-1.5">{card.badge}</div>}
          <div className={`text-[11px] font-semibold ${card.done ? "text-[#888] line-through" : "text-dark"}`}>
            {card.title}
          </div>
          {card.done && (
            <div className="flex items-center gap-1 mt-1.5">
              <Check size={12} className="text-emerald-500" />
              <span className="text-[10px] text-emerald-500 font-semibold">Completed</span>
            </div>
          )}
          {card.sub && <div className="text-[10px] text-[#888] mt-1">{card.sub}</div>}
          {card.extra}
        </div>
      ))}
    </div>
  );
}