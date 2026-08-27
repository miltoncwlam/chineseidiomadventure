import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 py-7 text-xs font-bold text-[var(--color-muted)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-8 lg:px-10">
      <span>© 2026 成語探險</span>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href="/privacy" className="transition hover:text-[var(--color-primary)]">
          私隱政策
        </Link>
        <Link href="/terms" className="transition hover:text-[var(--color-primary)]">
          服務條款
        </Link>
        <span className="hidden sm:inline">·</span>
        <span>讓每一次遊戲，都成為一次小小發現。</span>
      </div>
    </footer>
  );
}
