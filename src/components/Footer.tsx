import { FLAVOURS } from "@/lib/content";

const linkStyle = "mb-[9px] block text-[15px] font-bold no-underline [transition:color_0.2s] hover:text-red";
const headingStyle = "mb-[14px] text-[12px] font-extrabold uppercase tracking-[0.18em] text-dim";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t-[3px] border-red bg-[#050607] px-(--gutter) pt-[9vh] pb-[28px]">
      <div className="mx-auto grid max-w-[1560px] grid-cols-[2fr_repeat(3,1fr)] gap-[40px] narrow:grid-cols-[1fr_1fr]">
        <div className="narrow:col-[1/-1]">
          <p className="max-w-[9em] font-display text-[clamp(30px,3.4vw,54px)] leading-[1.05] uppercase">
            Five cans. One signature.
          </p>
          <a
            className="mt-[20px] inline-block text-[13px] font-extrabold uppercase tracking-[0.1em] text-red no-underline"
            href="#film"
          >
            Back to top
          </a>
        </div>
        <div>
          <h4 className={headingStyle}>Explore</h4>
          <a className={linkStyle} href="#film">The film</a>
          <a className={linkStyle} href="#flavours">Flavours</a>
          <a className={linkStyle} href="#why">Why it lasts</a>
        </div>
        <div>
          <h4 className={headingStyle}>Flavours</h4>
          {FLAVOURS.map((f, i) => (
            <a key={f.id} className={linkStyle} href="#flavours" data-flavour={i}>
              {f.name}
            </a>
          ))}
        </div>
        <div>
          <h4 className={headingStyle}>Connect</h4>
          <a className={linkStyle} href="#try">Try our cans</a>
          <a className={linkStyle} href="#contact">Contact us</a>
          <a className={linkStyle} href="https://www.coca-cola.com" target="_blank" rel="noopener">
            coca-cola.com
          </a>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-[7vh] mb-[2vh] text-center font-display text-[21.4vw] leading-[0.98] whitespace-nowrap uppercase text-red"
      >
        Coca-Cola
      </div>
      <p className="text-center text-[12px] font-medium leading-[1.5] text-dim">
        Independent concept site. Not affiliated with or endorsed by The Coca-Cola Company. Coca-Cola and related marks
        belong to their owner. Availability varies by market.
      </p>
    </footer>
  );
}
