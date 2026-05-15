const stats = [
  {
    icon: "assignment",
    colorClass: "bg-primary/10 text-primary",
    badge: "+12%",
    badgeColor: "text-primary",
    label: "Total Tasks",
    value: "24",
  },
  {
    icon: "task_alt",
    colorClass: "bg-secondary/10 text-secondary",
    badge: "18 done",
    badgeColor: "text-secondary",
    label: "Completed",
    value: "75%",
  },
  {
    icon: "pending",
    colorClass: "bg-tertiary/10 text-tertiary",
    badge: "6 left",
    badgeColor: "text-tertiary",
    label: "In Progress",
    value: "06",
  },
  {
    icon: "warning",
    colorClass: "bg-error-container text-on-error-container",
    badge: "High",
    badgeColor: "text-on-error-container",
    label: "Overdue",
    value: "02",
  },
];

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ icon, colorClass, badge, badgeColor, label, value }) => (
        <div
          key={label}
          className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/5"
          style={{ boxShadow: "0 10px 15px -3px rgba(99,102,241,0.08), 0 4px 6px -4px rgba(99,102,241,0.08)" }}
        >
          <div className="flex justify-between items-start mb-4">
            <span className={`p-2 rounded-lg material-symbols-outlined ${colorClass}`}>{icon}</span>
            <span className={`text-xs font-bold ${badgeColor}`}>{badge}</span>
          </div>
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{label}</p>
          <h3 className="text-5xl font-black text-on-surface mt-1">{value}</h3>
        </div>
      ))}
    </section>
  );
}