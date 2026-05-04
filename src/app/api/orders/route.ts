import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

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
