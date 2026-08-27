import Link from 'next/link';

export function AuthLegalLinks() {
  return (
    <p className="text-center text-xs font-bold text-[var(--color-muted)]">
      <Link href="/privacy" className="transition hover:text-[var(--color-primary)]">
        私隱政策
      </Link>
      <span className="mx-2">·</span>
      <Link href="/terms" className="transition hover:text-[var(--color-primary)]">
        服務條款
      </Link>
    </p>
  );
}
