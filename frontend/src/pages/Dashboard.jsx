import Sidebar from "../components/layout/Sidebar.jsx";
import TopBar from "../components/layout/TopBar.jsx";
import StatsGrid from "../components/dashboard/StatsGrid.jsx";
import TaskList from "../components/dashboard/TaskList.jsx";
import WeeklyOutput from "../components/dashboard/WeeklyOutput.jsx";
import ActivityFeed from "../components/dashboard/ActivityFeed.jsx";
import DeadlinesCalendar from "../components/dashboard/DeadlinesCalendar.jsx";
import ProjectProgressCard from "../components/dashboard/ProjectProgressCard.jsx";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#fcf8ff]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Fixed Sidebar — w-60 = 240px */}
      <Sidebar />

      {/* Main area offset by sidebar width */}
      <div className="flex flex-col flex-1 min-w-0 ml-60">
        {/* Sticky Top Bar */}
        <TopBar name="Alex" taskCount={4} />

        {/* Scrollable Main Content */}
        <main className="flex-1 p-6 xl:p-8 bg-[#fcf8ff] overflow-auto">
          <div className="max-w-screen-2xl mx-auto flex flex-col gap-6">

            {/* Stats Row — 4 equal columns */}
            <StatsGrid />

            {/* Content Grid: left wide | right 320px panel */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

              {/* Left Column */}
              <div className="flex flex-col gap-6 min-w-0">
                <TaskList />
                <WeeklyOutput />
                <ActivityFeed />
              </div>

              {/* Right Panel */}
              <div className="flex flex-col gap-6">
                <DeadlinesCalendar />
                <ProjectProgressCard projectName="Mobile App v2.0" progress={68} />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}