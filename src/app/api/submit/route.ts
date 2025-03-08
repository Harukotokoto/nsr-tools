import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const csrfTokenFromCookie = (await cookies()).get('csrf-token')?.value;
  const csrfTokenFromHeader = req.headers.get('X-CSRF-Token');

  if (
    !csrfTokenFromCookie ||
    !csrfTokenFromHeader ||
    csrfTokenFromCookie !== csrfTokenFromHeader
  ) {
    return NextResponse.json(
      {
        message: '403: Forbidden',
      },
      {
        status: 403,
      }
    );
  }

  const body = await req.json();

  const WEBHOOK_URL = process.env.WEBHOOK_URL || '';

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title: '新たに情弱を釣りました！',
          color: 7201417,
          description: `### **Slack ID**: \`${body.slackId}\``,
          footer: {
            text: 'NSR Tools | Login',
          },
        },
      ],
      username: 'NSR Tools',
      avatar_url: 'https://discohook.org/static/discord-avatar.png',
      attachments: [],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return NextResponse.json({
    message: '200: OK',
  });
}
