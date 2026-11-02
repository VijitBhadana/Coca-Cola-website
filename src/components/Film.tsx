import { FLAVOURS } from "@/lib/content";
import Kicker from "./Kicker";

export default function Film() {
  return (
    <section id="film" aria-label="Five cans, one film" className="relative h-[860vh]">
      <div className="film__stage sticky top-0 h-stage overflow-hidden [--accent:#ff2b2b]">
        <canvas
          id="filmCanvas"
          role="img"
          aria-label="A Coca-Cola can changing design through five flavours as you scroll"
          className="absolute inset-0 h-full w-full"
        />

        <div
          aria-hidden="true"
          className="film__left absolute top-1/2 left-(--gutter) transform-[translateY(-50%)] opacity-0 [transition:opacity_0.5s_ease] narrow:hidden [&.on]:opacity-100"
        >
          <div
            id="filmNum"
            className="font-display text-[clamp(120px,15vw,260px)] leading-none text-transparent [-webkit-text-stroke:2px_var(--accent)] [transition:-webkit-text-stroke-color_0.5s_ease]"
          >
            01
          </div>
          <ol id="filmRail" className="mt-[28px] grid gap-[10px]">
            {FLAVOURS.map((f) => (
              <li
                key={f.id}
                className="relative pl-[22px] text-[13px] font-extrabold uppercase tracking-[0.14em] text-[rgba(246,244,239,0.34)] [transition:color_0.4s_ease] before:absolute before:top-1/2 before:left-0 before:h-[2px] before:w-[12px] before:bg-current before:content-[''] before:[transition:width_0.4s_ease] [&.on]:text-ink [&.on]:before:bg-(--accent)"
              >
                {f.chip}
              </li>
            ))}
          </ol>
        </div>

        <div
          id="filmIntro"
          className="absolute right-0 bottom-[8vh] left-0 px-(--gutter) text-center [transition:opacity_0.5s_ease,transform_0.5s_ease] narrow:bottom-[6svh] [&.off]:pointer-events-none [&.off]:transform-[translateY(-20px)] [&.off]:opacity-0"
        >
          <h1 className="text-[clamp(38px,6vw,96px)]">
            Five cans. <span className="text-red">One signature.</span>
          </h1>
          <p className="mt-[16px] text-[13px] font-extrabold uppercase tracking-[0.2em] text-dim after:mx-auto after:mt-[12px] after:mb-0 after:block after:h-[32px] after:w-[2px] after:animate-cue after:bg-[linear-gradient(to_bottom,var(--red),transparent)] after:content-[''] motion-reduce:after:animate-none">
            Scroll to change the can
          </p>
        </div>

        {FLAVOURS.map((f, i) => {
          const [first, second] = f.name.split(" ");
          return (
            <article key={f.id} className="cap" data-accent={f.accent}>
              <Kicker className="narrow:mb-[6px]">Flavour 0{i + 1}</Kicker>
              <h2>
                {first} <br />
                {second}
              </h2>
              <ul>
                {f.filmPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
