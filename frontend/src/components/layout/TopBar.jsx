export default function TopBar() {
  return (
    <header className="sticky top-0 w-full z-40 bg-surface border-b border-outline-variant/10 flex items-center justify-between h-14 px-4 lg:pl-64 shadow-[0_4px_20px_-10px_rgba(99,102,241,0.1)]">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search tasks, projects... ⌘K"
            className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Pro Badge */}
        <div className="hidden sm:flex items-center bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full gap-2">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            workspace_premium
          </span>
          <span className="text-xs font-bold tracking-wider">Pro Plan</span>
        </div>

        {/* Icon buttons */}
        <div className="flex items-center gap-1">
          {["notifications", "help", "settings"].map((icon) => (
            <button
              key={icon}
              className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-surface-container-highest">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBowUEUOhmq9zR8sFUAnuZtyURqRYH2rzMTBdzHjTE6jVJcCIYl0x1Iek1jBLEq7AFaKkCtL7-S92THCEg-eztGF5OKyCsJAvh-NGkeh3JqZd86TClegoztw-lKp3OehYjwU_0L5b_gC5pQ_K6jSyrmQ5EiMNG8-4wMea8-HPDjwTceCGfD0ObTYxsBR13E2GAQ7ZEbxb36xCQOt7uk0a4cCuG8nh8F0x9i4MrtkeJ8O3fAW4XdtFqDiRSq6FMiHCYKiAhp6eyPZIky"
            alt="Alex"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}