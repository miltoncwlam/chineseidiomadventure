'use client';

import { SignUp } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerk-appearance';

export function SignUpPanel() {
  return (
    <SignUp
      fallback={
        <p className="py-12 text-center text-sm font-bold text-[var(--color-muted)]">正在開啟註冊…</p>
      }
      appearance={clerkAppearance}
    />
  );
}
