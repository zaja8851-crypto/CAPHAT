import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ORDERS_KEY = 'capzone_orders';

export async function GET() {
  try {
    const orders = await kv.get(ORDERS_KEY);
    return NextResponse.json(orders || []);
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

// PATCH: إضافة طلب واحد مباشرةً للقائمة (atomic)
export async function PATCH(request: Request) {
  try {
    const newOrder = await request.json();
    const existing = (await kv.get<any[]>(ORDERS_KEY)) || [];
    const updated = [newOrder, ...existing];
    await kv.set(ORDERS_KEY, updated);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add order' }, { status: 500 });
  }
}
