export default function ProjectProgressCard({
  projectName = "Mobile App v2.0",
  progress = 68,
}) {
  return (
    <div className="bg-primary p-8 rounded-xl text-white shadow-xl shadow-primary/30 relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-xs font-bold opacity-80 uppercase mb-1 tracking-wider">Current Project</p>
        <h4 className="text-xl font-bold mb-4">{projectName}</h4>

        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button className="mt-8 w-full py-2 bg-white text-primary rounded-lg font-bold hover:bg-opacity-90 transition-all">
          Launch Workspace
        </button>
      </div>

      {/* Decorative blob */}
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}