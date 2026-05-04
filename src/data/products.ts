export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  colors: string[];
  sizes?: string[];
  type: string;
  bestSeller: boolean;
  newArrival: boolean;
  promotion?: boolean;
  descriptionEn: string;
  descriptionAr: string;
}

export const products: Product[] = [
  {
    id: '1',
    nameEn: 'Classic Black Snapback',
    nameAr: 'سناب باك كلاسيك أسود',
    price: 120,
    image: '/images/cap1.jpg',
    images: ['/images/cap1.jpg', '/images/cap1-back.jpg'],
    colors: ['Black', 'Navy'],
    sizes: ['One Size'],
    type: 'Snapback',
    bestSeller: true,
    newArrival: false,
    descriptionEn: 'Premium quality black snapback with adjustable strap.',
    descriptionAr: 'قبعة سناب باك سوداء عالية الجودة مع حزام قابل للتعديل.',
  },
  {
    id: '2',
    nameEn: 'Street Style Beanie',
    nameAr: 'بيني ستريت ستايل',
    price: 85,
    image: '/images/cap2.jpg',
    images: ['/images/cap2.jpg'],
    colors: ['Grey', 'Black', 'Red'],
    type: 'Beanie',
    bestSeller: true,
    newArrival: true,
    descriptionEn: 'Warm and stylish beanie for cold weather.',
    descriptionAr: 'قبعة بيني دافئة وعصرية للطقس البارد.',
  },
  {
    id: '3',
    nameEn: 'Vintage Trucker Cap',
    nameAr: 'قبعة تروكر فينتاج',
    price: 95,
    image: '/images/cap3.jpg',
    images: ['/images/cap3.jpg'],
    colors: ['Blue/White', 'Green/White'],
    type: 'Trucker',
    bestSeller: false,
    newArrival: true,
    descriptionEn: 'Classic mesh back trucker cap with vintage logo.',
    descriptionAr: 'قبعة تروكر كلاسيكية بظهر شبكي وشعار كلاسيكي.',
  },
  {
    id: '4',
    nameEn: 'Modern Dad Hat',
    nameAr: 'قبعة داد هات عصرية',
    price: 110,
    image: '/images/cap4.jpg',
    images: ['/images/cap4.jpg'],
    colors: ['Beige', 'Olive'],
    type: 'Dad Hat',
    bestSeller: true,
    newArrival: false,
    descriptionEn: 'Simple and clean dad hat for everyday wear.',
    descriptionAr: 'قبعة داد هات بسيطة ونظيفة للارتداء اليومي.',
  },
];
