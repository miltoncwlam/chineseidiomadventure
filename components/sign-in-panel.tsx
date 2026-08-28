'use client';

import { ClerkFailed, SignIn } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerk-appearance';

export function SignInPanel() {
  return (
    <div>
      <ClerkFailed>
        <p className="rounded-[var(--radius)] border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-4 text-sm font-bold leading-6 text-[var(--color-text)]">
          登入元件未能載入，請重新整理頁面。本機請用 http://localhost:3002，並在 Clerk Dashboard 把該網址加到允許來源。
        </p>
      </ClerkFailed>
      <SignIn
        fallback={
          <p className="py-12 text-center text-sm font-bold text-[var(--color-muted)]">正在開啟登入…</p>
        }
        appearance={clerkAppearance}
      />
    </div>
  );
}
