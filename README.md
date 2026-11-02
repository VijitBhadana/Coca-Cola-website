# Coco-cola-web

Next.js and Tailwind CSS version of the Coca-Cola scroll site in `../site`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For the production version:

```bash
npm run build
npm start
```

## Where things live

| What | Where |
| --- | --- |
| All text, flavours, stats and timeline years | `src/lib/content.ts` |
| Contact form's email address | `CONTACT_EMAIL` in `src/lib/content.ts` |
| Scroll film, flavour deck, timeline, Lenis smooth scroll | `src/lib/experience.ts` |
| Page sections | `src/components/` |
| Reset, colours, keyframes and scroll-driven CSS | `src/app/globals.css` |
| Fonts (Anton, Archivo) | `src/app/fonts/` |
| Video frames and can images | `public/frames/`, `public/img/` |

## Things to know before changing it

- `CONTACT_EMAIL` is still the placeholder `hello@example.com`. The form has no backend and opens the visitor's email app.
- Keep Lenis at `1.1.20` unless you recheck how scrolling feels. It is pinned on purpose.
- Tailwind's Preflight reset is left out on purpose. Importing it changes line-heights and heading sizes.
- If the video is regenerated, recheck the frame numbers in `FILM_SEGMENTS` in `src/lib/experience.ts`.
- This is an independent concept site. Check the facts and get brand permission before publishing it.
