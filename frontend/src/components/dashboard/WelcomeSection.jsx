export default function WelcomeSection({ name = "Alex", taskCount = 4 }) {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-black text-on-surface">Good morning, {name}!</h2>
        <p className="text-on-surface-variant mt-1">
          You have {taskCount} tasks to complete today.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-xs font-semibold">
          Calendar View
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-xs font-semibold">
          Share Board
        </button>
      </div>
    </section>
  );
}