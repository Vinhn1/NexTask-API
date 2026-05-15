import Sidebar from "../components/layout/Sidebar.jsx";
import TopBar from "../components/layout/TopBar";
import Footer from "../components/layout/Footer";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsGrid from "../components/dashboard/StatsGrid";
import TaskList from "../components/dashboard/TaskList";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import DeadlinesCalendar from "../components/dashboard/DeadlinesCalendar";
import ProjectProgressCard from "../components/dashboard/ProjectProgressCard";

export default function Dashboard() {
  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen">
      <Sidebar />
      <TopBar />

      <main className="lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 space-y-8">
          <WelcomeSection name="Alex" taskCount={4} />
          <StatsGrid />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Tasks + Activity */}
            <div className="lg:col-span-2 space-y-6">
              <TaskList />
              <ActivityFeed />
            </div>

            {/* Right: Calendar + Progress */}
            <div className="space-y-8">
              <DeadlinesCalendar />
              <ProjectProgressCard projectName="Mobile App v2.0" progress={68} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}