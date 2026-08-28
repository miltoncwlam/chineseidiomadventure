'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { SiteFooter } from '@/components/site-footer';

type Copy = {
  hero: string;
  about: string;
  card: string;
};

const defaultCopy: Copy = {
  hero: '歡迎來到成語探險！這裡集合有趣又有挑戰性的互動遊戲，讓你在猜謎、配對和闖關之間，自然掌握更多成語。',
  about:
    '成語探險是一個給親子、學生和老師用的互動學習小站。每個遊戲圍繞一組成語：先用閃卡認識意思，再用連消和測驗練習。登入後可以把小山靈進度同步到雲端。',
  card: '透過山水風光閃卡、動態直線連消和多元測驗，邊玩邊認識 17 個充滿畫面感的山水風光成語。還可以照顧小山靈。'
};

export default function HomePage() {
  const [copy, setCopy] = useState<Copy>(defaultCopy);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
    const key = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '').trim();
    if (!url.startsWith('https://') || !key.startsWith('sb_publishable_')) return;
    const client = createClient(url, key);
    client
      .from('ui_copy')
      .select('key, body')
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, string> = {};
        data.forEach((row: { key: string; body: string }) => {
          map[row.key] = row.body;
        });
        setCopy({
          hero: map['hub.hero'] || defaultCopy.hero,
          about: map['hub.about'] || defaultCopy.about,
          card: map['hub.card.landscape'] || defaultCopy.card
        });
      });
  }, []);

  return (
    <div className="page-wrap min-h-screen">
      <header className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-8 sm:py-6 lg:px-10 lg:py-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="返回成語探險首頁">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-black text-[var(--color-primary-contrast)] shadow-md sm:h-12 sm:w-12 sm:text-2xl">
            語
          </span>
          <span className="min-w-0">
            <span className="block font-heading text-xl font-black leading-none tracking-[-0.04em] sm:text-3xl lg:text-4xl">
              成語探險
            </span>
            <span className="mt-1.5 block text-[0.65rem] font-bold leading-none text-[var(--color-muted)] sm:mt-2 sm:text-xs">
              每天玩一個，成語記得更牢
            </span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-3 text-sm font-bold text-[var(--color-muted)] sm:gap-7">
          <a href="#games" className="hidden transition hover:text-[var(--color-primary)] sm:inline">
            遊戲專區
          </a>
          <a href="#about" className="hidden transition hover:text-[var(--color-primary)] sm:inline">
            關於樂園
          </a>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link
              href="/sign-in"
              className="rounded-full bg-[var(--color-primary)] px-4 py-2.5 text-sm font-black text-[var(--color-primary-contrast)]"
            >
              登入
            </Link>
          )}
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 pb-14 pt-8 sm:gap-12 sm:px-8 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 lg:grid-cols-[1fr_0.82fr] lg:gap-12 lg:px-10 lg:pt-24">
          <div className="max-w-[570px]">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--color-primary)]/10 bg-[var(--color-surface)] px-3 py-2 text-[0.65rem] font-black text-[var(--color-primary)] shadow-sm sm:mb-6 sm:px-4 sm:text-xs">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
              互動學習 · 輕鬆遊戲 · 快樂累積
            </div>
            <h1 className="font-heading text-[1.9rem] font-black leading-[1.18] tracking-[-0.045em] sm:text-[2.65rem] sm:leading-[1.14] md:text-[3.65rem] lg:text-[4rem]">
              把成語，<span className="text-[var(--color-primary)]">玩成你的</span>
              <br />
              新技能。
            </h1>
            <p className="mt-5 max-w-[520px] text-sm font-medium leading-7 text-[var(--color-muted)] sm:mt-6 sm:text-base sm:leading-8">
              {copy.hero}
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/landscape"
                className="rounded-[var(--radius)] bg-[var(--color-primary)] px-5 py-3.5 text-center text-sm font-black text-[var(--color-primary-contrast)] shadow-lg shadow-[var(--color-primary)]/20 transition hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-base"
              >
                以訪客進入遊戲
              </Link>
              {!isSignedIn ? (
                <Link
                  href="/sign-in"
                  className="rounded-[var(--radius)] border-2 border-[var(--color-primary)] bg-[var(--color-surface)] px-5 py-3.5 text-center text-sm font-black text-[var(--color-primary)] sm:px-6 sm:text-base"
                >
                  登入同步進度
                </Link>
              ) : (
                <Link
                  href="/landscape"
                  className="rounded-[var(--radius)] border-2 border-[var(--color-primary)] bg-[var(--color-surface)] px-5 py-3.5 text-center text-sm font-black text-[var(--color-primary)] sm:px-6 sm:text-base"
                >
                  已登入，進入遊戲
                </Link>
              )}
            </div>
            <p className="mt-3 text-xs font-bold text-[var(--color-muted)]">不必登入也可以玩。登入後才會把進度存到雲端。</p>
          </div>

          <div className="hub-hero-art relative mx-auto flex min-h-[240px] w-full max-w-[400px] items-center justify-center sm:min-h-[300px] lg:min-h-[380px]">
            <div className="absolute h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl sm:h-72 sm:w-72" />
            <div className="pattern-lines relative flex h-56 w-56 rotate-3 items-center justify-center rounded-[2.5rem] bg-[var(--color-primary)] shadow-2xl shadow-[var(--color-primary)]/25 sm:h-72 sm:w-72">
              <div className="absolute -right-6 -top-5 flex h-14 w-14 -rotate-12 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-2xl shadow-xl">
                ✨
              </div>
              <div className="text-center text-[var(--color-primary-contrast)]">
                <p className="text-xs font-black tracking-[0.32em] opacity-80">IDIOM</p>
                <p className="mt-4 font-heading text-6xl font-black tracking-[-0.08em] sm:text-7xl">成語</p>
                <p className="mt-3 text-xs font-bold opacity-80">一字一句，探索智慧</p>
              </div>
            </div>
            <div className="orbit absolute bottom-0 left-0 rounded-2xl bg-[var(--color-surface)] px-3 py-2 text-xs font-black shadow-xl sm:left-1 sm:px-4 sm:py-3 sm:text-sm">
              🏮 今日也來玩一局
            </div>
            <div
              className="orbit absolute right-0 top-1 rounded-2xl bg-[var(--color-surface)] px-3 py-2 text-xs font-black shadow-xl sm:px-4 sm:py-3 sm:text-sm"
              style={{ animationDelay: '1.4s' }}
            >
              🌿 學習不停步
            </div>
          </div>
        </section>

        <section id="games" className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-8 sm:pb-20 md:pb-28 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-[var(--color-accent)]">IDIOM ADVENTURE</p>
              <h2 className="mt-2 font-heading text-3xl font-black md:text-4xl">選一個遊戲，立即出發</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[var(--color-muted)]">從山水風光開始你的第一趟成語旅程。</p>
          </div>

          <Link href="/landscape" className="game-card glass group block overflow-hidden rounded-[var(--radius)] border-2 border-transparent">
            <div className="grid md:grid-cols-[0.9fr_1.1fr]">
              <div className="pattern-lines flex min-h-56 items-center justify-center bg-[var(--color-primary)] p-8 text-center text-[var(--color-primary-contrast)] md:min-h-72">
                <div>
                  <div className="text-6xl transition duration-300 group-hover:scale-110 sm:text-7xl">🏞️</div>
                  <p className="mt-4 text-xs font-black tracking-[0.28em] opacity-75">LANDSCAPE IDIOM</p>
                  <p className="mt-2 font-heading text-3xl font-black sm:text-4xl">山水風光</p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-7 md:p-9">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--color-accent)]/12 px-3 py-1 text-xs font-black text-[var(--color-accent)]">
                    互動成語遊戲
                  </span>
                  <span className="text-2xl transition group-hover:translate-x-1">→</span>
                </div>
                <h3 className="mt-5 font-heading text-2xl font-black sm:text-3xl">山水風光</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">{copy.card}</p>
                <span className="mt-6 inline-flex w-full items-center justify-center rounded-[var(--radius)] bg-[var(--color-primary)] px-5 py-3 font-black text-[var(--color-primary-contrast)] sm:mt-7 sm:w-fit">
                  進入遊戲 <span className="ml-3 transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </Link>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="coming-card glass rounded-[var(--radius)] p-6">
              <p className="text-xs font-black tracking-[0.2em] text-[var(--color-muted)]">COMING SOON</p>
              <h3 className="mt-2 font-heading text-xl font-black">成語配對</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">即將推出。先從山水風光開始吧。</p>
            </div>
            <div className="coming-card glass rounded-[var(--radius)] p-6">
              <p className="text-xs font-black tracking-[0.2em] text-[var(--color-muted)]">COMING SOON</p>
              <h3 className="mt-2 font-heading text-xl font-black">成語闖關</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">即將推出。更多主題正在準備中。</p>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-8 sm:pb-20 md:pb-28 lg:px-10">
          <div className="glass rounded-[var(--radius)] p-7 md:p-10">
            <p className="text-xs font-black tracking-[0.2em] text-[var(--color-accent)]">ABOUT</p>
            <h2 className="mt-2 font-heading text-3xl font-black md:text-4xl">關於樂園</h2>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-[var(--color-muted)] sm:text-base sm:leading-8">
              {copy.about}
            </p>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[var(--color-muted)] sm:text-base sm:leading-8">
              現在可以玩「山水風光」。之後會陸續加入配對、闖關等不同玩法，共用同一個樂園入口。
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
