/* Coca-Cola scroll site
   Film: every source frame scrubbed on a canvas, adjacent frames crossfaded so
   short holds stay smooth. Frames stay as compressed blobs; only a sliding
   window is decoded (keeps RAM sane on mobile). Deck: stacked pages sliding in
   from the right. One rAF loop drives Lenis, the film and the deck.

   All of this runs outside React state on purpose: scroll updates touch the DOM
   directly every frame, so no component ever re-renders while scrolling. */

import Lenis from "lenis";

/* The video holds each can for a different length, so scroll is mapped per
   segment to give every flavour the same travel: [weight, fromFrame, toFrame].
   Odd segments are the flavour holds, even ones the can's design change. */
const FILM_SEGMENTS = [
  [1.0, 0, 66],
  [1.3, 66, 86],
  [0.5, 86, 98],
  [1.3, 98, 106],
  [0.5, 106, 118],
  [1.3, 118, 132],
  [0.5, 132, 144],
  [1.3, 144, 160],
  [0.5, 160, 172],
  [1.3, 172, 230],
  [0.5, 230, 239],
];

const KEEP = 40;   // evict decoded frames further than this from the playhead
const AHEAD = 24;  // decode this many frames ahead (scroll-direction weighted)
const BG = "#090c0e";
const NAV_CLEARANCE = 80;
const SLIDE = 0.62;     // share of each page's scroll spent sliding in
const LEAD = 0.04;      // the "Meet the five" card holds this long
const YEAR_DELAY = 0.12;  // the line reaches a year's dot just before the year rises
const POINT_GAP = 0.22;   // how far apart the first year's points start along the climb
const POINT_RISE = 0.34;  // how much of the climb each one takes to arrive

type Frame = { img: ImageBitmap; url?: undefined } | { img: HTMLImageElement; url: string };

const $ = (id: string) => document.getElementById(id)!;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/* ── film: scroll mapping ──────────────────────────────── */

const filmWeight = FILM_SEGMENTS.reduce((sum, seg) => sum + seg[0], 0);

// flavour holds as scroll fractions, reaching a little into the design changes
const flavourRanges = (() => {
  let at = 0;
  const ranges: [number, number][] = [];
  FILM_SEGMENTS.forEach(([weight], i) => {
    const start = at / filmWeight;
    at += weight;
    if (i % 2) ranges.push([start, at / filmWeight]);
  });
  return ranges;
})();

function scrollToFrame(p: number) {
  let at = p * filmWeight;
  for (const [weight, from, to] of FILM_SEGMENTS) {
    if (at <= weight) return from + (to - from) * (at / weight);
    at -= weight;
  }
  return FILM_SEGMENTS.at(-1)![2];
}

// createImageBitmap can throw in hidden tabs and some webviews; <img> decodes everywhere
async function decodeBlob(blob: Blob): Promise<Frame> {
  try {
    return { img: await createImageBitmap(blob) };
  } catch {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    return { img, url };
  }
}

function release(f: Frame) {
  if (f.url === undefined) f.img.close();
  else URL.revokeObjectURL(f.url);
}

/** Wires up the page once it is in the DOM. Returns the teardown for React. */
export function startExperience() {
  const teardown = new AbortController();
  const { signal } = teardown;

  const canvas = $("filmCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const film = $("film");
  const loader = $("loader");
  const narrow = matchMedia("(max-width: 900px), (max-aspect-ratio: 5/4)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  const lenis = reduced.matches ? null : new Lenis({ lerp: 0.09, smoothWheel: true });

  /* ── film: loading ─────────────────────────────────────── */

  const state = {
    blobs: [] as (Blob | null)[],
    frames: new Map<number, Frame>(),  // index → decoded window only
    decoding: new Set<number>(),
    count: 0,
    pattern: "",
    smooth: 0,
    drawn: -1,
    dir: 1,
    ready: false,
  };

  const frameURL = (i: number) => `/${state.pattern.replace("%04d", String(i + 1).padStart(4, "0"))}`;

  async function fetchBlob(i: number) {
    if (state.blobs[i]) return state.blobs[i];
    const res = await fetch(frameURL(i), { signal });
    state.blobs[i] = await res.blob();
    return state.blobs[i];
  }

  async function decode(i: number) {
    const blob = state.blobs[i];
    if (state.frames.has(i) || state.decoding.has(i) || !blob) return;
    state.decoding.add(i);
    try {
      const frame = await decodeBlob(blob);
      if (signal.aborted) release(frame);
      else state.frames.set(i, frame);
    } catch { /* transient decode failure — retried next tick */ }
    state.decoding.delete(i);
  }

  function manageWindow(center: number) {
    for (let d = 0; d <= AHEAD; d++) {
      const fwd = center + d * state.dir;
      const back = center - Math.min(d, 8) * state.dir;
      if (fwd >= 0 && fwd < state.count) decode(fwd);
      if (back >= 0 && back < state.count) decode(back);
    }
    if (state.frames.size > KEEP * 2) {
      for (const [idx, f] of state.frames) {
        if (Math.abs(idx - center) > KEEP) {
          release(f);
          state.frames.delete(idx);
        }
      }
    }
  }

  async function preload() {
    const { count } = state;
    const eager = Math.ceil(count * 0.3);
    let done = 0;
    await Promise.all(
      Array.from({ length: eager }, (_, i) =>
        fetchBlob(i).then(() => {
          $("loadbar").style.width = `${(++done / eager) * 100}%`;
        })
      )
    );
    await decode(0);
    state.ready = true;
    loader.classList.add("done");
    lenis?.start();
    // a reload restores scroll before hydration, so that scroll event was never heard
    updateNav();
    revealNow();

    let next = eager;
    await Promise.all(
      Array.from({ length: 6 }, async () => {
        while (next < count && !signal.aborted) {
          const i = next++;
          try { await fetchBlob(i); } catch { /* refetched on demand */ }
        }
      })
    );
  }

  /* ── film: drawing ─────────────────────────────────────── */

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    state.drawn = -1;
  }

  function nearestDecoded(i: number) {
    if (state.frames.has(i)) return i;
    for (let d = 1; d < state.count; d++) {
      if (state.frames.has(i - d)) return i - d;
      if (state.frames.has(i + d)) return i + d;
    }
    return -1;
  }

  function edgeFade(x0: number, y0: number, x1: number, y1: number) {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, BG);
    g.addColorStop(1, "rgba(9, 12, 14, 0)");
    return g;
  }

  function drawFilm(pos: number) {
    const base = Math.floor(pos);
    const j = nearestDecoded(base);
    if (j < 0) return;
    const { img } = state.frames.get(j)!;
    const cw = canvas.width, ch = canvas.height;
    // wide screens fit the frame to the height; narrow ones keep the top for the can
    const fh = narrow.matches ? ch * 0.64 : Math.min(ch, cw * 0.62);
    const s = fh / img.height;
    const w = img.width * s, h = img.height * s;
    const x = (cw - w) / 2;

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, x, 0, w, h);
    const next = state.frames.get(base + 1);
    if (j === base && next && pos > base) {
      ctx.globalAlpha = pos - base;
      ctx.drawImage(next.img, x, 0, w, h);
      ctx.globalAlpha = 1;
    }

    // melt the frame's rectangle into the page
    const side = w * 0.14;
    ctx.fillStyle = edgeFade(x, 0, x + side, 0);
    ctx.fillRect(x, 0, side, h);
    ctx.fillStyle = edgeFade(x + w, 0, x + w - side, 0);
    ctx.fillRect(x + w - side, 0, side, h);
    if (h < ch) {
      ctx.fillStyle = edgeFade(0, h, 0, h - ch * 0.1);
      ctx.fillRect(0, h - ch * 0.1, cw, ch * 0.1);
    }
    state.drawn = pos;
  }

  function filmProgress() {
    const max = film.offsetHeight - innerHeight;
    return max > 0 ? clamp(scrollY / max) : 0;
  }

  const caps = [...document.querySelectorAll<HTMLElement>(".cap")];
  const railItems = [...$("filmRail").children];
  const stage = document.querySelector<HTMLElement>(".film__stage")!;
  const filmLeft = document.querySelector(".film__left")!;
  let activeFlavour = -1;

  function updateCaptions(p: number) {
    const pad = 0.5 * 0.5 / filmWeight;  // half a design change either side of a hold
    let active = -1;
    flavourRanges.forEach(([a, b], i) => {
      if (p >= a - pad && p < b + pad && (i < 4 || p < 0.965)) active = i;
    });
    if (active !== activeFlavour) {
      activeFlavour = active;
      caps.forEach((el, i) => el.classList.toggle("on", i === active));
      railItems.forEach((el, i) => el.classList.toggle("on", i === active));
      if (active >= 0) {
        stage.style.setProperty("--accent", caps[active].dataset.accent!);
        $("filmNum").textContent = `0${active + 1}`;
      }
    }
    $("filmIntro").classList.toggle("off", p > 0.055);
    filmLeft.classList.toggle("on", active >= 0);
  }

  /* ── flavour deck ──────────────────────────────────────── */

  const deck = $("flavours");
  const panels = [...document.querySelectorAll<HTMLElement>(".panel")];
  const dots = [...$("deckDots").children];

  function deckProgress() {
    const max = deck.offsetHeight - innerHeight;
    return clamp((scrollY - deck.offsetTop) / max);
  }

  let lastDeck = -1;
  function updateDeck() {
    const raw = deckProgress();
    if (raw === lastDeck) return;
    lastDeck = raw;
    const dp = clamp((raw - LEAD) / (1 - LEAD)) * panels.length;
    const ts = panels.map((_, i) => ease(clamp((dp - i) / SLIDE)));

    panels.forEach((el, i) => {
      el.style.setProperty("--t", ts[i].toFixed(4));
      el.style.setProperty("--out", (ts[i + 1] ?? 0).toFixed(4));
      el.style.visibility = ts[i] > 0 && (ts[i + 1] ?? 0) < 1 ? "visible" : "hidden";
    });
    $("deckIntro").style.setProperty("--out", ts[0].toFixed(4));

    const current = ts.findLastIndex((t) => t > 0.5);
    dots.forEach((el, i) => el.classList.toggle("on", i === current));
    $("deckHud").classList.toggle("on", current >= 0);
    $("deckBar").style.transform = `scaleX(${raw.toFixed(4)})`;
  }

  /* ── timeline story: one more year for each stretch of scroll ─ */

  const timeline = $("timeline");
  const years = [...timeline.querySelectorAll("ol > li")];
  const firstPoints = [...years[0].querySelectorAll<HTMLElement>(".mini li")];

  // the first year's points fade and flow up while the heading climbs, all in by the pin
  function riseFirstPoints(top: number) {
    const list = firstPoints[0].parentElement!;
    const enter = innerHeight - (list.getBoundingClientRect().top - top);
    const climb = top <= 0 ? 1 : clamp(1 - top / enter);
    firstPoints.forEach((el, i) => {
      el.style.setProperty("--rise", clamp((climb - i * POINT_GAP) / POINT_RISE).toFixed(3));
    });
  }

  function updateTimeline() {
    const r = timeline.getBoundingClientRect();
    riseFirstPoints(r.top);
    const step = clamp(-r.top / (r.height - innerHeight)) * years.length;
    // the first year scrolls in attached to the heading; the rest arrive once it pins
    const current = clamp(Math.floor(step - YEAR_DELAY), 0, years.length - 1);
    years.forEach((el, i) => {
      el.classList.toggle("on", i <= current);
      el.classList.toggle("now", i === current);
    });
    $("timelineFill").style.transform = `scaleX(${(step / years.length).toFixed(4)})`;
  }

  function flavourScrollY(i: number) {
    const max = deck.offsetHeight - innerHeight;
    const dp = i + SLIDE + (1 - SLIDE) * 0.5;
    return deck.offsetTop + (LEAD + (dp / panels.length) * (1 - LEAD)) * max;
  }

  function goTo(target: number) {
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else scrollTo(0, target);
  }

  dots.forEach((el, i) => el.addEventListener("click", () => goTo(flavourScrollY(i)), { signal }));

  document.addEventListener("click", (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    if (a.dataset.flavour) return goTo(flavourScrollY(+a.dataset.flavour));
    const el = document.querySelector(a.getAttribute("href")!);
    if (!el) return;
    // the film and deck are full-height stages that sit under the nav on purpose
    const clearance = el === film || el === deck ? 0 : NAV_CLEARANCE;
    goTo(el.getBoundingClientRect().top + scrollY - clearance);
  }, { signal });

  /* ── reveal + nav ──────────────────────────────────────── */

  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
    { threshold: 0.18 }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  // IO callbacks can be skipped on instant jumps — reveal anything already in view
  function revealNow() {
    document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92 && r.bottom > 0) el.classList.add("in");
    });
  }
  addEventListener("scroll", revealNow, { passive: true, signal });

  const nav = $("brandnav");
  function updateNav() {
    nav.classList.toggle("on", scrollY > (film.offsetHeight - innerHeight) * 0.98);
  }
  addEventListener("scroll", updateNav, { passive: true, signal });

  /* ── main loop ─────────────────────────────────────────── */

  let lastT = performance.now();
  let raf = 0;
  function tick(now: number) {
    const dt = Math.min((now - lastT) / 1000, 0.5) || 0.016;
    lastT = now;
    lenis?.raf(now);

    if (state.ready) {
      const p = filmProgress();
      if (scrollY <= film.offsetHeight) {
        const target = scrollToFrame(p);
        if (target !== state.smooth) state.dir = target > state.smooth ? 1 : -1;
        state.smooth += (target - state.smooth) * (1 - Math.exp(-dt * 14));
        if (Math.abs(target - state.smooth) < 0.01) state.smooth = target;
        manageWindow(Math.round(state.smooth));
        if (state.smooth !== state.drawn || !state.frames.has(Math.floor(state.drawn))) drawFilm(state.smooth);
        updateCaptions(p);
      }
      updateDeck();
      updateTimeline();
    }
    raf = requestAnimationFrame(tick);
  }

  /* ── boot ──────────────────────────────────────────────── */

  addEventListener("resize", () => { resize(); lastDeck = -1; }, { signal });
  resize();
  lenis?.stop();

  fetch("/frames/frames.json", { signal })
    .then((res) => res.json())
    .then((m) => {
      state.count = m.count;
      state.pattern = m.pattern;
      state.blobs = new Array(m.count).fill(null);
      raf = requestAnimationFrame(tick);
      return preload();
    })
    .catch(() => {
      if (signal.aborted) return;
      loader.classList.add("done");
      lenis?.start();
    });

  return () => {
    teardown.abort();
    cancelAnimationFrame(raf);
    io.disconnect();
    lenis?.destroy();
    state.frames.forEach(release);
    state.frames.clear();
  };
}
