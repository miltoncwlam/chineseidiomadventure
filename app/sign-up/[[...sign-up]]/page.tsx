import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
import { AuthLegalLinks } from '@/components/auth-legal-links';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-10">
      <Link href="/" className="text-sm font-bold text-[var(--color-accent)]">
        ← 返回成語探險
      </Link>
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/" />
      <Link
        href="/landscape"
        className="text-sm font-black text-[var(--color-primary)] underline-offset-4 hover:underline"
      >
        先以訪客進入遊戲
      </Link>
      <AuthLegalLinks />
    </main>
  );
}
