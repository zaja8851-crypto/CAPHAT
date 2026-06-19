import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ORDERS_KEY = 'capzone_orders';

export async function GET() {
  try {
    const ordersHash = await kv.hgetall(ORDERS_KEY + '_hash');
    const newOrders = ordersHash ? Object.values(ordersHash).map(v => typeof v === 'string' ? JSON.parse(v) : v) : [];
    
    const legacyOrders = await kv.get<any[]>(ORDERS_KEY) || [];
    
    // Sort by date descending (newest first)
    const allOrders = [...newOrders, ...legacyOrders].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return NextResponse.json(allOrders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const orders = await request.json();
    await kv.set(ORDERS_KEY, orders);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save orders' }, { status: 500 });
  }
}

// PATCH: إضافة طلب واحد مباشرةً للهيكل (atomic, no race conditions)
export async function PATCH(request: Request) {
  try {
    const newOrder = await request.json();
    await kv.hset(ORDERS_KEY + '_hash', { [newOrder.id]: JSON.stringify(newOrder) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add order' }, { status: 500 });
  }
}

// DELETE: حذف طلب معين (atomic)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await kv.hdel(ORDERS_KEY + '_hash', id);
    
    // Also try to remove from legacy array if it exists there
    const legacy = await kv.get<any[]>(ORDERS_KEY);
    if (legacy) {
      const updated = legacy.filter(o => o.id !== id);
      await kv.set(ORDERS_KEY, updated);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
