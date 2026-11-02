import type { CSSProperties } from "react";
import { BENTO, MARQUEE, STATS, TIMELINE } from "@/lib/content";
import Kicker from "./Kicker";

export default function Why() {
  return (
    <section id="why" className="relative overflow-clip">
      <div aria-hidden="true" className="overflow-hidden border-y border-line bg-red">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span
              key={i}
              className="px-[28px] py-[12px] font-display text-[clamp(26px,3vw,44px)] whitespace-nowrap uppercase text-white"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div data-reveal className="px-(--gutter) pt-[20vh] pb-[13vh] text-center">
        <Kicker className="[--accent:var(--red)]">Why it lasts</Kicker>
        <h2 className="mx-auto max-w-[13ch] text-[clamp(50px,9.4vw,170px)]">
          One signature. <em className="text-red not-italic">Five ways</em> to feel it.
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1560px] grid-cols-[repeat(4,1fr)] gap-[24px] px-(--gutter) pb-[13vh] narrow:grid-cols-[repeat(2,1fr)]">
        {STATS.map((stat) => (
          <div key={stat.num} data-reveal className="border-t-[3px] border-red pt-[18px]">
            <div className="font-display text-[clamp(56px,7vw,116px)] leading-none">{stat.num}</div>
            <div className="mt-[10px] text-[14px] font-bold text-dim">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1560px] grid-cols-[repeat(5,1fr)] gap-[18px] px-(--gutter) pb-[13vh] narrow:grid-cols-[1fr]">
        {BENTO.map((card) => (
          <article
            key={card.img}
            data-reveal
            className={`group relative isolate flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[14px] bg-[#121619] before:absolute before:inset-0 before:-z-1 before:bg-[linear-gradient(to_top,rgba(6,8,9,0.94)_16%,rgba(6,8,9,0)_68%)] before:content-[''] narrow:col-auto narrow:min-h-[360px] ${
              card.wide ? "col-span-3" : "col-span-2"
            }`}
          >
            <img
              src={`/img/${card.img}.webp`}
              alt={card.alt}
              loading="lazy"
              className="absolute inset-0 -z-2 h-full w-full object-cover [transition:transform_0.9s_cubic-bezier(.2,.7,.2,1)] group-hover:transform-[scale(1.05)] motion-reduce:[transition:none]"
            />
            <div className="p-[26px]">
              <h3 className="text-[clamp(30px,3vw,50px)]">{card.title}</h3>
              <p className="mt-[10px] max-w-[44ch] text-[16px] leading-[1.42] text-[rgba(246,244,239,0.84)]">
                {card.text}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="timeline" id="timeline">
        <div className="timeline__stage">
          <h3>The road to five</h3>
          <div className="timeline__rail">
            <i id="timelineFill" />
            <ol>
              {TIMELINE.map((entry, i) => (
                <li key={entry.year} style={{ "--i": i } as CSSProperties}>
                  <b>{entry.year}</b>
                  <span>{entry.label}</span>
                  <ul className="mini">
                    {entry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
