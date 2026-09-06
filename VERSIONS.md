# 成語探險 version log

Product: **成語探險** (`chineseidiomadventure`).
Live site: https://chineseidiom.vercel.app
Source: https://github.com/miltoncwlam/chineseidiomadventure

Check out any tagged snapshot with `git fetch --tags && git checkout vX.Y.Z`.
GitHub Releases: https://github.com/miltoncwlam/chineseidiomadventure/releases

## How versions are numbered

- **V1.x** — two-file Vue game you originally sent, plus the same-day local edits before GitHub existed.
- **V2.x** — first GitHub repo: static hub + 山水風光.
- **V3.x** — Next.js app, Clerk, legal pages, production auth proxy.
- **V4.x** — current line (visible sign-up, then later growth / more idioms).

When a user-visible change ships, add a row here and create an annotated tag `vX.Y.Z` on that commit.

---

## V1 — original game (before GitHub)

Exact `index.html` / `theme.css` bytes from 26 Aug 2026 were overwritten in place before the first commit. They are **not** recoverable from git. The tagged branch `archive/v1.0` holds this record. Closest runnable code on GitHub is **v2.0.0**.

| Version | Date (HKT) | Git | What it was |
| --- | --- | --- | --- |
| **V1.0** | 2026-08-26 13:03 | tag `v1.0.0` on `archive/v1.0` (record only) | The files you sent: `index.html` + `theme.css` only. Vue 3 / Tailwind / confetti from CDN. 17 山水風光 idioms. Three tabs: flashcards, straight-line puzzle, 12-question quiz. Header coins + streak. Hidden leftover 小山靈 / riddle UI. |
| **V1.1** | 2026-08-26 13:07–13:31 | folded into v2.0.0 | Font `@import` order, relative `theme.css`, puzzle timer, Tingting 普通話, Fisher–Yates shuffle, quiz uniqueness / true-false / review page, green swipe tiles, 3-column puzzle lists. |
| **V1.2** | 2026-08-26 13:35–16:55 | folded into v2.0.0 | Hub homepage, 小山靈 Tamagotchi tab (hunger / mood / stages), coin economy, localStorage `chengyu-shanshui-v1`, Clerk + Supabase wiring, closed exams (no shop during quiz). |
| **V1.3** | 2026-08-26 16:56–22:04 | folded into v2.0.0 | OneCompiler / `chineseidiom.oneapp.dev` attempt, your Supabase keys, rename `shanshui` → `landscape`, mobile layout. |

---

## V2 — first GitHub snapshots (all on `main`)

| Version | Date (HKT) | Tag | Commit | What changed |
| --- | --- | --- | --- | --- |
| **V2.0** | 2026-08-27 11:08 | `v2.0.0` | `db43050` | First GitHub publish: static hub (`index.html` / `Homepage/`) + `landscape.html` / `landscape.css` + `config.js` + `supabase-setup.sql`. This is the first **code** snapshot on GitHub. |
| **V2.1** | 2026-08-27 11:26 | `v2.1.0` | `2a98ae9` | Point Clerk at `chineseidiom.vercel.app`; drop leftover ChengYu identifiers. |

---

## V3 — Next.js + Clerk production

| Version | Date (HKT) | Tag | Commit | What changed |
| --- | --- | --- | --- | --- |
| **V3.0** | 2026-08-27 12:02 | `v3.0.0` | `62d5739` | Next.js App Router hub, Clerk, privacy/terms, exam lock fixes. Game stays Vue in `public/landscape.html`. |
| **V3.1** | 2026-08-27 12:16 | `v3.1.0` | `73112d2` | Full-page `/sign-in` and `/sign-up`; drop Clerk modal overlay. |
| **V3.2** | 2026-08-27 21:14 | `v3.2.0` | `0089148` | Gold mountain-edge skin visible on 小山靈 and shop card. |
| **V3.3** | 2026-08-28 18:21 | `v3.3.0` | `4bf3bf2` | Branded full-page sign-in; remove leftover Homepage hub / old overlay. |
| **V3.4** | 2026-08-28 18:29 | `v3.4.0` | `b4b4933` | Clerk appearance types so Vercel build succeeds. |
| **V3.5** | 2026-08-28 18:34 | `v3.5.0` | `40b943d` | Remove Clerk Edge middleware (Node-only modules broke Vercel Edge). |
| **V3.6** | 2026-08-28 21:43 | `v3.6.0` | `f13d898` | Mark the Vercel project as Next.js so production serves the homepage. |
| **V3.7** | 2026-08-28 22:19 | `v3.7.0` | `72798b6` | Same-origin Clerk Frontend API proxy (`/__clerk`) so live sign-in can load. |
| **V3.8** | 2026-08-28 22:49 | `v3.8.0` | `8d55066` | Point live Clerk at `/__clerk`; stop relative `proxyUrl` crashing prerender. |
| **V3.9** | 2026-08-29 15:46 | `v3.9.0` | `2458923` | Strip both `/__clerk` and `/api/clerk` so Clerk stops 404ing after Next rewrites. |

---

## V4 — current

| Version | Date (HKT) | Tag | Commit | What changed |
| --- | --- | --- | --- | --- |
| **V4.0** | 2026-09-06 12:01 | `v4.0.0` | `e35ac8e` | Visible **註冊** on homepage header/hero and a **還沒有帳戶？註冊** button on `/sign-in`. |

---

## Not a code version (ops / Clerk dashboard)

These changed production behaviour without a git commit:

- Clerk production: email/password only (social OAuth off).
- Password `min_length` 15 → 8; leaked-password (HIBP) check disabled.
- `chineseidiom.vercel.app` sometimes needs a manual alias onto the latest Ready deploy.

---

## Planned (not shipped)

1. **V4.1** — 小山靈 actually grows (size / stage over days and care).
2. **V4.2** — more idioms in the existing Supabase `idioms` table, merged into 山水風光.
