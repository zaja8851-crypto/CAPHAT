import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MESSAGES_KEY = 'capzone_messages';

export async function GET() {
  try {
    const messagesHash = await kv.hgetall(MESSAGES_KEY + '_hash');
    const newMessages = messagesHash ? Object.values(messagesHash).map(v => typeof v === 'string' ? JSON.parse(v) : v) : [];
    
    const legacyMessages = await kv.get<any[]>(MESSAGES_KEY) || [];
    
    // Sort by date descending (newest first)
    const allMessages = [...newMessages, ...legacyMessages].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return NextResponse.json(allMessages);
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

// PATCH: إضافة رسالة واحدة مباشرةً للهيكل (atomic, no race conditions)
export async function PATCH(request: Request) {
  try {
    const newMessage = await request.json();
    await kv.hset(MESSAGES_KEY + '_hash', { [newMessage.id]: JSON.stringify(newMessage) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}

// DELETE: حذف رسالة معينة (atomic)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await kv.hdel(MESSAGES_KEY + '_hash', id);
    
    // Also try to remove from legacy array if it exists there
    const legacy = await kv.get<any[]>(MESSAGES_KEY);
    if (legacy) {
      const updated = legacy.filter(m => m.id !== id);
      await kv.set(MESSAGES_KEY, updated);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
