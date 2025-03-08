import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const csrfToken = (await cookies()).get('csrf-token')?.value || 'NOT_SET';

  return NextResponse.json(
    {
      message: '200: OK',
      csrfToken: csrfToken,
    },
    {
      status: 200,
    }
  );
}
