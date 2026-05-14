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
    <section style={{ margin: "64px 32px 0" }}>
      <Card style={{ padding: "32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ borderLeft: i > 0 ? "1px solid #f0edf8" : "none" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: s.color, letterSpacing: "-1px" }}>{s.val}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}