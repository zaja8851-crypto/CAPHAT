import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const PRODUCTS_KEY = 'capzone_products';

export async function GET() {
  try {
    const products = await kv.get(PRODUCTS_KEY);
    return NextResponse.json(products || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const products = await request.json();
    await kv.set(PRODUCTS_KEY, products);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}
