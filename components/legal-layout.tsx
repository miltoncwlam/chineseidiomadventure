import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="page-wrap min-h-screen">
      <header className="mx-auto max-w-[820px] px-4 py-6 sm:px-8">
        <Link href="/" className="text-sm font-bold text-[var(--color-accent)]">
          ← 返回成語探險
        </Link>
        <h1 className="mt-4 font-heading text-3xl font-black sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">最後更新：2026 年 8 月 27 日</p>
      </header>
      <main className="mx-auto max-w-[820px] px-4 pb-12 sm:px-8">
        <article className="glass rounded-[var(--radius)] space-y-6 p-7 text-sm leading-7 text-[var(--color-text)] md:p-10 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-[var(--color-primary)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
