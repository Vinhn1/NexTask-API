const footerLinks = {
  Product: ["Features", "Pricing"],
  Company: ["About", "Support"],
  Legal: ["Privacy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="lg:pl-64 bg-surface-container-lowest border-t border-outline-variant/30 py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-black text-primary">NexTask</h2>
          <p className="text-sm text-on-surface-variant mt-2">
            Master your workflow, one task at a time.
          </p>
        </div>
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">{section}</h4>
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-outline-variant/10">
        <p className="text-sm text-on-surface-variant">© 2024 NexTask Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}