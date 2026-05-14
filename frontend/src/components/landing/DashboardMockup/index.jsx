import { Check, Bell, Layout } from "lucide-react";
import { C } from "@/constants/brand";
import Pill from "@/components/ui/Pill";
import KanbanCol from "./KanbanCol";

export default function DashboardMockup() {
  return (
    <div style={{ position: "relative", maxWidth: 900, margin: "64px auto 0" }}>
      {/* Main dashboard frame */}
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        border: `1px solid ${C.border}`,
        boxShadow: "0 40px 100px -20px rgba(70,72,212,0.15)",
        padding: "24px",
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", gap: 24 }}>
          {/* Sidebar mock */}
          <div style={{ width: 160, flexShrink: 0, borderRight: `1px solid ${C.border}`, paddingRight: 20 }}>
            <div style={{ height: 24, width: 80, background: "#f0edf8", borderRadius: 6, marginBottom: 24 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Dashboard", active: true },
                { label: "My Tasks" },
                { label: "Team" },
                { label: "Analytics" },
              ].map(item => (
                <div key={item.label} style={{
                  fontSize: 12, fontWeight: 700,
                  color: item.active ? C.indigo : "#888",
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: item.active ? C.indigo : "transparent" }} />
                  {item.label}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#aaa", textTransform: "uppercase", marginBottom: 12 }}>Projects</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { c: C.indigo, t: "Website Redesign" },
                  { c: C.green, t: "Mobile App v2" },
                  { c: C.amber, t: "Q4 Marketing" },
                ].map(p => (
                  <div key={p.t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.c }} />
                    <span style={{ fontSize: 11, color: "#555", fontWeight: 500 }}>{p.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content area mock */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <KanbanCol
                title="Backlog" count={4} dot="#94a3b8"
                titleColor="#666" countBg="#e2e8f0" countColor="#64748b"
                cards={[
                  {
                    title: "Redesign onboarding flow",
                    badge: <Pill variant="amber" style={{ fontSize: 10, padding: "2px 8px" }}>High</Pill>,
                    sub: "Due Dec 20"
                  },
                  {
                    title: "Update privacy policy",
                    badge: <Pill variant="green" style={{ fontSize: 10, padding: "2px 8px" }}>Low</Pill>,
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
                    badge: <Pill style={{ background: "#fee2e2", color: "#b91c1c", border: "none", fontSize: 10, padding: "2px 8px" }}>Urgent</Pill>,
                    extra: (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.indigo, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 8, color: "#fff", fontWeight: 700 }}>SK</span>
                        </div>
                        <span style={{ fontSize: 10, color: "#888" }}>Dec 18</span>
                      </div>
                    )
                  },
                  {
                    title: "API docs update",
                    badge: <Pill variant="indigo" style={{ fontSize: 10, padding: "2px 8px" }}>Medium</Pill>,
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
