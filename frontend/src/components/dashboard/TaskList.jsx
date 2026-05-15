const tasks = [
  {
    title: "Refactor UI component library",
    subtitle: "NexTask Design System • Due 5:00 PM",
    priority: "bg-error",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVKUsNc8aZVlU2lMj4zw8Vavbua3UjWyK14a1d-qx3coPClszsa0Q0ij3o3mSJKmjPzfqDc8VcuI8imAwJgyPqHasmYQx3X7ErbuElbQn885BZKPKN_ew_4izBi4WCYDC_KU8jXK6JEjvEP6Nd3VdW9PxHceM5oZ3aR0Sy_4uSwLWTOGIXWNsS7EtaPPTs102yF3bUrGgeB0Kxa2QWRXHp6q6eWQFsCxw6uM1Rf83I-kLbnIGs4MVKohsRExBDRDGQs77AlTslAwEv",
    ],
  },
  {
    title: "Weekly team sync & roadmap",
    subtitle: "General • Today at 2:00 PM",
    priority: "bg-tertiary",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHghAUWp00n9LDuAnsKbJgjAmX_MSW4N6zJf3VrVivw9vCrwLlSAGZv4vzjr5fChTi0tNBjeEAC9Sb1tW9gAty3qArPd1jcQovPiKuDGL5Qt47FJwXXgGCZKnJwJqwUAgB4Luc--G7vBbHadWNutLLDup-Vxdk8P7ZjPYwvTonpLRgY3FrrIH5hynTA89zWBz20sc75Nh0XmuNiI9QT-1RVaY_ZarXXMwUBpVzoJGiIMJMBVi9Snqu0mGuPluy4M4TnpeqkkSl-doJ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXFGD4Qez0j9dHxyjxk8yM9aWWpFePYU0bBWu20n2i96R7Bsmq83pzDZ9ZPizbvjmH7ey6fH7dGVmzxCl-TJBnqIOpz1daBW3fJ3z9u6Gq--Q3iR4JntKiibaxttq5aG7k9l4vUKymKNFm4nrnEOkuVw7_CVgEVc3K9Reu78zomue77PEVhMZ39NaGAp63Xp36ZPmEjyfVqFph-B5mOT2TXOqqReNaKh9YhfYjFJX0hYeCqblliVD7Pt10U2_htzHy4KHtpDj_vMRl",
    ],
  },
  {
    title: "Prepare quarterly financial projections",
    subtitle: "Finance • Tomorrow",
    priority: "bg-secondary",
    avatars: [],
  },
];

function TaskItem({ title, subtitle, priority, avatars }) {
  return (
    <div className="p-4 flex items-center gap-4 group hover:bg-surface-container-low transition-colors">
      <button className="w-6 h-6 border-2 border-outline-variant rounded-full flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
        <span className="material-symbols-outlined text-base text-transparent group-hover:text-outline-variant">
          check
        </span>
      </button>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-on-surface truncate">{title}</h4>
        <p className="text-xs text-on-surface-variant">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className={`w-2 h-2 rounded-full ${priority}`} />
        {avatars.length > 0 && (
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="member"
                className="w-7 h-7 rounded-full border-2 border-surface object-cover"
              />
            ))}
          </div>
        )}
        <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-surface-container-high rounded-full transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-xl">more_vert</span>
        </button>
      </div>
    </div>
  );
}

export default function TaskList() {
  return (
    <div
      className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/5"
      style={{ boxShadow: "0 10px 15px -3px rgba(99,102,241,0.08), 0 4px 6px -4px rgba(99,102,241,0.08)" }}
    >
      <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-surface">My Tasks Today</h3>
        <button className="text-primary text-xs font-semibold hover:underline">View All</button>
      </div>
      <div className="divide-y divide-outline-variant/5">
        {tasks.map((task) => (
          <TaskItem key={task.title} {...task} />
        ))}
      </div>
    </div>
  );
}