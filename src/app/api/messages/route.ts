import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

// PATCH: إضافة رسالة واحدة مباشرةً للقائمة (atomic)
export async function PATCH(request: Request) {
  try {
    const newMessage = await request.json();
    const existing = (await kv.get<any[]>(MESSAGES_KEY)) || [];
    const updated = [newMessage, ...existing];
    await kv.set(MESSAGES_KEY, updated);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}

