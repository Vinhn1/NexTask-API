export default function WelcomeSection({ name = "Vinh", taskCount = 4 }) {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-black text-[#1b1b23]">Chào buổi sáng, {name}! 👋</h2>
        <p className="text-[#464554] mt-1 font-medium opacity-80">
          Bạn có <span className="text-primary font-bold">{taskCount} nhiệm vụ</span> cần hoàn thành hôm nay.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-5 py-2.5 bg-white border border-outline-variant/20 rounded-xl text-[#1b1b23] hover:bg-[#f4f4f7] hover:shadow-sm transition-all text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-rounded text-lg">calendar_month</span>
          Xem lịch
        </button>
        <button className="px-5 py-2.5 bg-primary text-white rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-rounded text-lg">share</span>
          Chia sẻ
        </button>
      </div>
    </section>
  );
}