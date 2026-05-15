// Stats.jsx
import { C } from "@/constants/brand";
import { Card } from "@/components/ui/Card";

export function Stats() {
  const stats = [
    { val: "50k+",  label: "Users Active",      color: C.indigo },
    { val: "1.2M+", label: "Tasks Completed",   color: "#1b1b23" },
    { val: "4.9/5", label: "Team Ratings",      color: "#1b1b23" },
    { val: "35%",   label: "Time Saved",        color: C.cyan },
  ];
  return (
    <section className="mt-16 mx-8">
      <Card className="px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-4 md:py-0 ${i > 0 ? 'md:border-l border-[#f0edf8]' : ''} ${i === 2 ? 'border-l md:border-l' : ''} ${i % 2 === 0 ? '' : 'border-l border-[#f0edf8] md:border-l'}`}>
              <div 
                className="text-4xl font-black tracking-tight" 
                style={{ color: s.color }}
              >
                {s.val}
              </div>
              <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}