import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const MESSAGES_KEY = 'capzone_messages';

export async function GET() {
  try {
    const messages = await kv.get(MESSAGES_KEY);
    return NextResponse.json(messages || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const messages = await request.json();
    await kv.set(MESSAGES_KEY, messages);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save messages' }, { status: 500 });
  }
}
