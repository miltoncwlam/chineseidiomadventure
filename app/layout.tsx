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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-HK">
      <body>
        <ClerkProvider
          localization={zhTW}
          appearance={clerkAppearance}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          proxyUrl={process.env.NEXT_PUBLIC_CLERK_PROXY_URL || '/api/clerk'}
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
