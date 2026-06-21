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
    id: 'v19bge7xv',
    nameEn: 'NEW YORK',
    nameAr: 'NEW YORK',
    price: 120,
    oldPrice: 150,
    type: 'Snapback',
    image: '',
    images: [],
    colors: ['Standard'],
    sizes: ['Universal'],
    bestSeller: false,
    newArrival: true,
    promotion: false,
    descriptionEn: 'Premium quality cap.',
    descriptionAr: 'قبعة ذات جودة عالية.',
  },
  {
    id: 'hq3gel3du',
    nameEn: 'BROOKLYN',
    nameAr: 'BROOKLYN',
    price: 130,
    oldPrice: 149,
    type: 'Snapback',
    image: '',
    images: [],
    colors: ['Standard'],
    sizes: ['Universal'],
    bestSeller: false,
    newArrival: true,
    promotion: false,
    descriptionEn: 'Premium quality cap.',
    descriptionAr: 'قبعة ذات جودة عالية.',
  },
  {
    id: 'abtphzvrx',
    nameEn: 'MERCEDES F1',
    nameAr: 'MERCEDES F1',
    price: 120,
    oldPrice: 139,
    type: 'Snapback',
    image: '',
    images: [],
    colors: ['Standard'],
    sizes: ['Universal'],
    bestSeller: false,
    newArrival: true,
    promotion: false,
    descriptionEn: 'Premium quality cap.',
    descriptionAr: 'قبعة ذات جودة عالية.',
  },
  {
    id: '13i689eag',
    nameEn: 'NY',
    nameAr: 'NY',
    price: 130,
    oldPrice: 159,
    type: 'Snapback',
    image: 'https://i.ibb.co/7NKrVsrT/IMG-20260603-WA0009.jpg',
    images: ['https://i.ibb.co/7NKrVsrT/IMG-20260603-WA0009.jpg'],
    colors: ['Standard'],
    sizes: ['Universal'],
    bestSeller: false,
    newArrival: true,
    promotion: false,
    descriptionEn: 'Premium quality cap.',
    descriptionAr: 'قبعة ذات جودة عالية.',
  },
  {
    id: 'uge748b0b',
    nameEn: 'SUPER 23 SERIES',
    nameAr: 'SUPER 23 SERIES',
    price: 119,
    oldPrice: 150,
    type: 'Snapback',
    image: 'https://i.ibb.co/99kvpXZq/Screenshot-20260502-114413-Brave-1.jpg',
    images: [
      'https://i.ibb.co/99kvpXZq/Screenshot-20260502-114413-Brave-1.jpg',
      'https://i.ibb.co/QFqVZpBG/Screenshot-20260502-111823-Chrome-1.jpg'
    ],
    colors: ['Standard'],
    sizes: ['Universal'],
    bestSeller: true,
    newArrival: true,
    promotion: false,
    descriptionEn: 'Premium quality cap.',
    descriptionAr: 'قبعة ذات جودة عالية.',
  },
  {
    id: '1z6rqjoaj',
    nameEn: 'SNOW NIKE',
    nameAr: 'SNOW NIKE',
    price: 120,
    oldPrice: 149,
    type: 'Snapback',
    image: 'https://i.ibb.co/CfKTpZ3/IMG-20260603-WA0008.jpg',
    images: ['https://i.ibb.co/CfKTpZ3/IMG-20260603-WA0008.jpg'],
    colors: ['Standard'],
    sizes: ['Universal'],
    bestSeller: false,
    newArrival: true,
    promotion: false,
    descriptionEn: 'Premium quality cap.',
    descriptionAr: 'قبعة ذات جودة عالية.',
  },
];
