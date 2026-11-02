const LINKS = [
  { href: "#flavours", label: "Flavours" },
  { href: "#why", label: "Why it lasts" },
  { href: "#try", label: "Try a can" },
  { href: "#contact", label: "Contact" },
];

export default function BrandNav() {
  return (
    <nav
      id="brandnav"
      aria-label="Main"
      className="pointer-events-none fixed top-0 right-0 left-0 z-80 flex transform-[translateY(-8px)] items-center justify-between gap-[20px] bg-[color-mix(in_srgb,var(--bg)_62%,transparent)] px-(--gutter) py-[14px] opacity-0 backdrop-blur-[14px] [transition:opacity_0.4s_ease,transform_0.4s_ease] [&.on]:pointer-events-auto [&.on]:transform-none [&.on]:opacity-100"
    >
      <a
        className="font-display text-[22px] uppercase tracking-[0.04em] text-red no-underline"
        href="#film"
      >
        Coca-Cola
      </a>
      <div className="flex gap-[clamp(18px,2.6vw,40px)] phone:hidden">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[13px] font-bold uppercase tracking-[0.1em] text-dim no-underline [transition:color_0.25s] hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </div>
      <a
        className="rounded-[100px] bg-red px-[20px] py-[10px] text-[13px] font-extrabold uppercase tracking-[0.08em] text-white no-underline [transition:background_0.25s] hover:bg-[#ff2a2f]"
        href="#try"
      >
        Try our cans
      </a>
    </nav>
  );
}
