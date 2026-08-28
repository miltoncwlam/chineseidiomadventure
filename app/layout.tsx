import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { zhTW } from '@clerk/localizations';
import { clerkAppearance } from '@/lib/clerk-appearance';
import './globals.css';

export const metadata: Metadata = {
  title: '成語探險｜互動成語遊戲',
  description: '把成語玩成你的新技能。'
};

const PRODUCTION_CLERK_PROXY_URL = 'https://chineseidiom.vercel.app/__clerk';

export default function RootLayout({ children }: { children: ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const fromEnv = process.env.NEXT_PUBLIC_CLERK_PROXY_URL?.trim();
  // Relative proxy URLs make Clerk read `window` during prerender and fail the Vercel build.
  const proxyUrl =
    fromEnv && /^https?:\/\//.test(fromEnv)
      ? fromEnv
      : publishableKey?.startsWith('pk_live_')
        ? PRODUCTION_CLERK_PROXY_URL
        : undefined;

  return (
    <html lang="zh-HK">
      <body>
        <ClerkProvider
          localization={zhTW}
          appearance={clerkAppearance}
          publishableKey={publishableKey}
          {...(proxyUrl ? { proxyUrl } : {})}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
          afterSignOutUrl="/"
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
