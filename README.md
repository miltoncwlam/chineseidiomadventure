# 成語探險 V1.0 (original)

This tag records the **first files sent into Cursor** on 26 Aug 2026, 13:03 HKT.

Git did not exist yet. The two source files were edited in place that afternoon, then first committed the next morning as **v2.0.0**. The original bytes are therefore not in this repository. This branch is the written record of V1.0.

## Original files

- `index.html` — markup, Vue 3 app, 17-idiom bank, flashcards, swipe puzzle, quiz
- `theme.css` — color tokens and layout

Stack: Vue 3 + Tailwind + canvas-confetti from CDNs. No Next.js, no Clerk, no Supabase, no GitHub.

## What V1.0 contained

- Product name: 成語探險 —— 山水風光
- 17 landscape idioms (山明水秀, 世外桃源, …) with pinyin, meaning, English, example, synonyms/antonyms
- Tabs: 學習卡, 動態直線連消, 測驗
- Coins start at 150; streak in the header; `lives` unused
- Puzzle: 5–7 board, 8-direction swipe, reveal-one (last answer locked), unused timer helpers
- Quiz: 12 items, four templates; true/false items were always 正確
- Hidden leftover riddle UI and a static 小山靈 aside (`riddle-old`) with no nav tab
- Stylesheet href was `/theme.css` (broke local/folder opens)
- `@import` for Noto Sans TC sat after `:root` (font never loaded)

## What happened next

See `VERSIONS.md` on `main`. Closest runnable snapshot: tag **v2.0.0**.
