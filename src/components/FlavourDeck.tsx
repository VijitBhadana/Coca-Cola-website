import type { CSSProperties } from "react";
import { FLAVOURS } from "@/lib/content";
import Kicker from "./Kicker";

const delay = (d: number) => ({ "--d": d }) as CSSProperties;

export default function FlavourDeck() {
  return (
    <section id="flavours" aria-label="The five flavours" className="relative h-[750vh]">
      <div className="sticky top-0 h-stage overflow-hidden bg-bg">
        <div
          id="deckIntro"
          className="deck__intro absolute inset-0 flex flex-col items-center justify-center px-(--gutter) text-center"
        >
          <Kicker className="[--accent:var(--red)]">The line-up</Kicker>
          <h2 className="text-[clamp(64px,13vw,220px)]">Meet the five.</h2>
          <div aria-hidden="true" className="mt-[18px] flex max-w-[min(1100px,100%)] justify-center">
            {FLAVOURS.map((f) => (
              <img key={f.id} src={`/img/${f.id}-thumb.webp`} alt="" className="h-auto w-[20%] min-w-0" />
            ))}
          </div>
          <p className="mt-[10px] text-[13px] font-extrabold uppercase tracking-[0.2em] text-dim">Keep scrolling</p>
        </div>

        {FLAVOURS.map((f) => (
          <article key={f.id} className={`panel panel--${f.id}`}>
            <div className="panel__ghost" aria-hidden="true">
              {f.short}
            </div>
            <div className="panel__can">
              <img
                src={`/img/${f.id}.webp`}
                alt={f.alt}
                className="h-full w-full max-w-full animate-float object-contain [filter:drop-shadow(0_30px_50px_rgba(0,0,0,0.55))] motion-reduce:animate-none"
              />
            </div>
            <div className="relative min-w-0">
              <Kicker className="stag narrow:mb-[6px] narrow:text-[12px]" style={delay(0)}>
                {f.kicker}
              </Kicker>
              <h3
                className="stag text-[clamp(56px,7vw,132px)] whitespace-nowrap narrow:text-[min(13.6vw,8vh)]"
                style={delay(1)}
              >
                {f.name}
              </h3>
              <p
                className="stag mt-[14px] text-[clamp(19px,1.9vw,28px)] font-extrabold leading-[1.2] narrow:mt-[6px] narrow:text-[17px]"
                style={delay(2)}
              >
                {f.line}
              </p>
              <ul className="stag mt-[22px] grid gap-[11px] narrow:mt-[10px] narrow:gap-[5px]" style={delay(3)}>
                {f.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-[22px] text-[clamp(15px,1.2vw,18px)] font-semibold leading-[1.35] text-dim before:absolute before:top-[0.6em] before:left-0 before:h-[3px] before:w-[10px] before:bg-(--accent) before:content-[''] narrow:text-[14px] short:nth-3:hidden"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <dl
                className="stag mt-[26px] flex gap-[clamp(22px,3vw,48px)] border-t border-line pt-[18px] narrow:mt-[12px] narrow:pt-[10px] short:hidden"
                style={delay(4)}
              >
                {Object.entries(f.facts).map(([term, value]) => (
                  <div key={term}>
                    <dt className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-dim">{term}</dt>
                    <dd className="mt-[4px] font-display text-[clamp(22px,2.2vw,34px)] uppercase text-(--accent) narrow:text-[20px]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}

        <div
          id="deckHud"
          className="absolute right-(--gutter) bottom-[22px] left-(--gutter) z-5 opacity-0 [transition:opacity_0.4s_ease] [&.on]:opacity-100"
        >
          <div
            id="deckDots"
            role="group"
            aria-label="Jump to a flavour"
            className="mb-[10px] flex gap-[clamp(14px,2.2vw,32px)]"
          >
            {FLAVOURS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="cursor-pointer border-0 bg-none py-[4px] text-[12px] font-extrabold uppercase tracking-[0.14em] text-dim [background-color:transparent] [transition:color_0.3s] hover:text-ink [&.on]:text-ink"
              >
                {f.short}
              </button>
            ))}
          </div>
          <div className="h-[2px] bg-line">
            <i id="deckBar" className="block h-full w-full origin-left transform-[scaleX(0)] bg-red" />
          </div>
        </div>
      </div>
    </section>
  );
}
