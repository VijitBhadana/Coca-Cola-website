"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CONTACT_EMAIL, FLAVOURS } from "@/lib/content";
import Kicker from "./Kicker";

const SWAP_MS = 220;

export default function TryContact() {
  const [picked, setPicked] = useState(0);
  const [shown, setShown] = useState(0);
  const [status, setStatus] = useState("");
  const flavour = FLAVOURS[picked];
  const swapping = shown !== picked;

  useEffect(() => {
    if (!swapping) return;
    const timer = setTimeout(() => setShown(picked), SWAP_MS);
    return () => clearTimeout(timer);
  }, [picked, swapping]);

  // no backend: hand the message to the visitor's own email app
  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = `Try a can: ${d.get("flavour")}`;
    const body = `${d.get("message")}\n\n${d.get("name")}\n${d.get("email")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with this message, ready to send.");
  }

  return (
    <section
      id="try"
      className="grid scroll-mt-[60px] grid-cols-[1fr_1fr] gap-[clamp(30px,6vw,110px)] bg-[radial-gradient(ellipse_60%_70%_at_24%_46%,#4a070b,var(--bg)_74%)] px-(--gutter) py-[12vh] narrow:grid-cols-[1fr]"
    >
      <div data-reveal>
        <Kicker className="[--accent:#ff5a5f]">Try our cans</Kicker>
        <h2 className="text-[clamp(46px,5.8vw,100px)]">Pick your can.</h2>
        <div role="radiogroup" aria-label="Choose a flavour" className="mt-[16px] flex flex-wrap gap-[8px]">
          {FLAVOURS.map((f, i) => (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={i === picked}
              onClick={() => setPicked(i)}
              className="cursor-pointer rounded-[100px] border border-line bg-[rgba(246,244,239,0.07)] px-[16px] py-[10px] text-[13px] font-extrabold uppercase tracking-[0.06em] text-ink [transition:background_0.25s,border-color_0.25s] hover:border-ink aria-checked:border-red aria-checked:bg-red"
            >
              {f.chip}
            </button>
          ))}
        </div>
        <div className="mt-[12px] h-[clamp(260px,30vw,400px)] animate-float motion-reduce:animate-none">
          <img
            src={`/img/${FLAVOURS[shown].id}.webp`}
            alt={`${FLAVOURS[shown].name} can`}
            className={`h-full w-full object-contain [filter:drop-shadow(0_26px_40px_rgba(0,0,0,0.5))] [transition:opacity_0.3s_ease] ${
              swapping ? "opacity-0" : ""
            }`}
          />
        </div>
        <p className="font-display text-[clamp(30px,3vw,46px)] uppercase">{flavour.name}</p>
        <p className="mt-[6px] min-h-[1.4em] text-[16px] text-dim">{flavour.line}</p>
      </div>

      <div id="contact" data-reveal className="scroll-mt-[90px] self-center">
        <Kicker className="[--accent:#ff5a5f]">Contact us</Kicker>
        <h2 className="text-[clamp(46px,5.8vw,100px)]">Tell us what you’d pour.</h2>
        <form id="contactForm" onSubmit={sendMessage}>
          <label>
            Your name
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Can you want to try
            <select
              name="flavour"
              id="contactFlavour"
              value={flavour.name}
              onChange={(e) => setPicked(e.target.selectedIndex)}
            >
              {FLAVOURS.map((f) => (
                <option key={f.id} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows={4} required />
          </label>
          <button type="submit">Send message</button>
          <p id="contactStatus" role="status" className="min-h-[1.4em] text-[14px] text-dim">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
