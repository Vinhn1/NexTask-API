import { C } from "@/constants/brand";
import Pill from "@/components/ui/Pill";
import KanbanCol from "./KanbanCol";

export default function DashboardMockup() {
  return (
    <div className="relative max-w-[900px] mx-auto mt-16">
      {/* Main dashboard frame */}
      <div className="bg-white rounded-[24px] border border-border shadow-[0_40px_100px_-20px_rgba(70,72,212,0.15)] p-6 overflow-hidden">
        <div className="flex gap-6">
          {/* Sidebar mock */}
          <div className="w-[160px] shrink-0 border-r border-border pr-5">
            <div className="h-6 w-20 bg-subtle rounded-md mb-6" />
            <div className="flex flex-col gap-3">
              {[
                { label: "Dashboard", active: true },
                { label: "My Tasks" },
                { label: "Team" },
                { label: "Analytics" },
              ].map(item => (
                <div key={item.label} className={`text-[12px] font-bold flex items-center gap-2 ${item.active ? "text-primary" : "text-[#888]"}`}>
                  <div className={`w-1 h-1 rounded-full ${item.active ? "bg-primary" : "bg-transparent"}`} />
                  {item.label}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="text-[10px] font-extrabold text-[#aaa] uppercase mb-3">Projects</div>
              <div className="flex flex-col gap-1.5">
                {[
                  { c: C.indigo, t: "Website Redesign" },
                  { c: C.green, t: "Mobile App v2" },
                  { c: C.amber, t: "Q4 Marketing" },
                ].map(p => (
                  <div key={p.t} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.c }} />
                    <span className="text-[11px] text-[#555] font-medium">{p.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content area mock */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-2.5">
              <KanbanCol
                title="Backlog" count={4} dot="#94a3b8"
                titleColor="#666" countBg="#e2e8f0" countColor="#64748b"
                cards={[
                  {
                    title: "Redesign onboarding flow",
                    badge: <Pill variant="amber" className="text-[10px] px-2 py-0.5">High</Pill>,
                    sub: "Due Dec 20"
                  },
                  {
                    title: "Update privacy policy",
                    badge: <Pill variant="green" className="text-[10px] px-2 py-0.5">Low</Pill>,
                    sub: "No deadline"
                  }
                ]}
              />
              <KanbanCol
                title="In Progress" count={3} dot={C.indigo}
                titleColor={C.indigo} countBg="#eef0fd" countColor={C.indigo}
                cards={[
                  {
                    title: "Fix payment gateway bug",
                    bordered: true,
                    badge: <Pill className="bg-red-100 text-red-700 border-none text-[10px] px-2 py-0.5">Urgent</Pill>,
                    extra: (
                      <div className="flex items-center gap-1 mt-1.5">
                        <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center">
                          <span className="text-[8px] text-white font-bold">SK</span>
                        </div>
                        <span className="text-[10px] text-[#888]">Dec 18</span>
                      </div>
                    )
                  },
                  {
                    title: "API docs update",
                    badge: <Pill variant="indigo" className="text-[10px] px-2 py-0.5">Medium</Pill>,
                    sub: "Dec 22"
                  }
                ]}
              />
              <KanbanCol
                title="Done" count={8} dot="#10b981"
                titleColor="#059669" countBg="#d1fae5" countColor="#065f46"
                cards={[
                  { title: "Setup CI/CD pipeline", done: true },
                  { title: "User research interviews", done: true }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
