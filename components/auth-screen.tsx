import type { ReactNode } from 'react';
import Link from 'next/link';
import { AuthLegalLinks } from '@/components/auth-legal-links';

type AuthScreenProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthScreen({ title, subtitle, children }: AuthScreenProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1fr_1.05fr]">
      <aside className="pattern-lines relative flex min-h-[220px] flex-col justify-between bg-[var(--color-primary)] p-6 text-[var(--color-primary-contrast)] sm:p-8 lg:min-h-screen lg:p-10">
        <Link href="/" className="text-sm font-bold opacity-90 transition hover:opacity-100">
          ← 返回成語探險
        </Link>
        <div className="py-8 lg:py-0">
          <p className="text-xs font-black tracking-[0.28em] opacity-75">IDIOM ADVENTURE</p>
          <h1 className="mt-3 font-heading text-3xl font-black leading-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-md text-sm font-medium leading-7 opacity-90 sm:text-base">{subtitle}</p>
        </div>
        <Link
          href="/landscape"
          className="inline-flex w-fit rounded-[var(--radius)] border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-black backdrop-blur transition hover:bg-white/15"
        >
          先以訪客進入遊戲
        </Link>
      </aside>

      <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] px-4 py-8 sm:px-8">
        <div className="auth-clerk-shell w-full max-w-lg">{children}</div>
        <div className="mt-8">
          <AuthLegalLinks />
        </div>
      </main>
    </div>
  );
}
