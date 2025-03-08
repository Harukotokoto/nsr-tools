import { createCsrfMiddleware } from '@edge-csrf/nextjs';
import { NextRequest } from 'next/server';

const csrfMiddleware = createCsrfMiddleware({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  if (url === '/api/csrf') {
    return;
  }

  const res = await csrfMiddleware(req);

  const existingCsrfToken = req.cookies.get('csrf-token')?.value;

  if (!existingCsrfToken) {
    const csrfToken = res.headers.get('X-CSRF-Token');
    if (csrfToken) {
      res.headers.append(
        'Set-Cookie',
        `csrf-token=${csrfToken}; Path=/; HttpOnly; SameSite=Strict`
      );
    }
  }

  return res;
}

export const config = {
  matcher: ['/'],
};
