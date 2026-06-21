import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const PRODUCTS_KEY = 'capzone_products';

// GET /api/admin/cleanup — strips all base64 images from KV products
export async function GET() {
  try {
    const products: any[] = (await kv.get(PRODUCTS_KEY) as any[]) || [];

    const cleaned = products.map((p: any) => {
      const cleanImg = (img: string) =>
        img && typeof img === 'string' && img.startsWith('data:') ? '' : (img || '');

      const cleanImages = (Array.isArray(p.images) ? p.images : [p.image])
        .map(cleanImg)
        .filter(Boolean);

      return {
        ...p,
        image: cleanImg(p.image),
        images: cleanImages.length > 0 ? cleanImages : [],
      };
    });

    await kv.set(PRODUCTS_KEY, cleaned);

    return NextResponse.json({
      success: true,
      totalProducts: cleaned.length,
      products: cleaned.map((p: any) => ({
        id: p.id,
        nameEn: p.nameEn,
        nameAr: p.nameAr,
        price: p.price,
        image: p.image || '(empty - needs URL)',
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
