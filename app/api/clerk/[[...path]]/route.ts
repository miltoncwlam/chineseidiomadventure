import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const FAPI_ORIGIN = 'https://frontend-api.clerk.dev';
const PROXY_PATH = '/api/clerk';

async function proxyToClerk(request: NextRequest) {
  const secret = process.env.CLERK_SECRET_KEY?.trim() || '';
  if (!secret.startsWith('sk_')) {
    return NextResponse.json({ error: 'Clerk proxy is not configured' }, { status: 500 });
  }

  const incoming = new URL(request.url);
  const suffix = incoming.pathname.startsWith(PROXY_PATH)
    ? incoming.pathname.slice(PROXY_PATH.length) || '/'
    : incoming.pathname;
  const target = new URL(suffix + incoming.search, FAPI_ORIGIN);
  const origin = incoming.origin;
  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '127.0.0.1';

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (lower === 'host' || lower === 'connection' || lower === 'content-length') return;
    headers.set(key, value);
  });
  headers.set('Clerk-Proxy-Url', `${origin}${PROXY_PATH}`);
  headers.set('Clerk-Secret-Key', secret);
  headers.set('X-Forwarded-For', clientIp);

  const body =
    request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.arrayBuffer();

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body,
    redirect: 'manual'
  });

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete('content-encoding');
  responseHeaders.delete('content-length');
  responseHeaders.delete('transfer-encoding');

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders
  });
}

export const GET = proxyToClerk;
export const POST = proxyToClerk;
export const PUT = proxyToClerk;
export const PATCH = proxyToClerk;
export const DELETE = proxyToClerk;
export const OPTIONS = proxyToClerk;
