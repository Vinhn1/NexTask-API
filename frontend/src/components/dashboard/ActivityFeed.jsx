const activities = [
  {
    icon: "edit",
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
    text: (
      <>
        <strong>Sarah Jenkins</strong> updated the <strong>API Documentation</strong>
      </>
    ),
    time: "24 minutes ago",
  },
  {
    icon: "add",
    iconBg: "bg-primary-container",
    iconColor: "text-on-primary-container",
    text: (
      <>
        <strong>You</strong> created 4 new tasks in <strong>Mobile App v2.0</strong>
      </>
    ),
    time: "2 hours ago",
  },
  {
    icon: "chat",
    iconBg: "bg-tertiary-container",
    iconColor: "text-on-tertiary-container",
    text: (
      <>
        <strong>Mike Ross</strong> commented on <strong>Home Screen Redesign</strong>
      </>
    ),
    time: "Yesterday",
  },
];

export default function ActivityFeed() {
  return (
    <div
      className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/5"
      style={{ boxShadow: "0 10px 15px -3px rgba(99,102,241,0.08), 0 4px 6px -4px rgba(99,102,241,0.08)" }}
    >
      <h3 className="text-lg font-bold text-on-surface mb-4">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map(({ icon, iconBg, iconColor, text, time }, i) => (
          <div key={i} className="flex gap-4">
            <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
              <span className={`material-symbols-outlined ${iconColor} text-lg`}>{icon}</span>
            </div>
            <div>
              <p className="text-sm text-on-surface">{text}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}