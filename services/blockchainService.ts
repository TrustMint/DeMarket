import type { Listing, NewListingData } from '../types';
import { ipfsService } from './ipfsService';

const initialListings: Listing[] = [
  {
    id: 1,
    title: 'Винтажная кожаная куртка',
    description: 'Классическая кожаная куртка в байкерском стиле, в отличном состоянии. Размер M. Натуральная кожа, произведена в Италии. Фурнитура YKK.',
    price: 150,
    seller: '0x1234567890123456789012345678901234567890',
    imageUrl: 'https://picsum.photos/seed/leatherjacket/800/600',
    status: 'Available',
    category: 'Fashion',
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    title: 'Наушники Sony WH-1000XM4',
    description: 'Лучшее в отрасли шумоподавление с технологией Dual Noise Sensor. Музыка нового уровня с Edge-AI. Полный комплект, состояние идеальное.',
    price: 280,
    discountPrice: 249,
    seller: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    imageUrl: 'https://picsum.photos/seed/sonyxm4/800/600',
    status: 'Available',
    category: 'Electronics',
    rating: 4.9,
    reviews: 157,
  },
  {
    id: 3,
    title: 'Антикварный деревянный стул',
    description: 'Красивый дубовый стул начала 20-го века. Идеально подходит в качестве декоративного элемента. Ручная работа, требует небольшой реставрации.',
    price: 220,
    seller: '0x1234567890123456789012345678901234567890',
    imageUrl: 'https://picsum.photos/seed/oldchair/800/600',
    status: 'Sold',
    category: 'Home & Garden',
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 4,
    title: 'Акустическая гитара - Yamaha F310',
    description: 'Полноразмерная акустическая гитара, идеальна для начинающих. В комплекте мягкий чехол и новые струны D\'Addario.',
    price: 120,
    seller: '0xfedcba9876543210fedcba9876543210fedcba98',
    imageUrl: 'https://picsum.photos/seed/guitar/800/600',
    status: 'Available',
    category: 'Hobbies',
    rating: 4.7,
    reviews: 45,
  },
  {
    id: 5,
    title: 'Игровая консоль Nintendo Switch OLED',
    description: 'Последняя модель с ярким 7-дюймовым OLED-экраном. В комплекте два джой-кона, док-станция и игра "Zelda: Breath of the Wild".',
    price: 350,
    discountPrice: 320,
    seller: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    imageUrl: 'https://picsum.photos/seed/switch/800/600',
    status: 'Available',
    category: 'Electronics',
    rating: 5.0,
    reviews: 88,
  },
  {
    id: 6,
    title: 'Дизайнерские кроссовки "Future Runner"',
    description: 'Лимитированная серия, футуристический дизайн. Размер 10 US. Новые, в коробке.',
    price: 450,
    seller: '0x1234567890123456789012345678901234567890',
    imageUrl: 'https://picsum.photos/seed/sneakers/800/600',
    status: 'Available',
    category: 'Fashion',
    rating: 4.9,
    reviews: 31,
  },
];


let listings: Listing[] = [...initialListings];
let nextId = initialListings.length + 1;

class BlockchainService {
  async getListings(): Promise<Listing[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...listings].sort((a,b) => b.id - a.id);
  }

  async createListing(data: NewListingData): Promise<Listing | null> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const imageUrl = await ipfsService.uploadFile(data.imageFile);
    if (!imageUrl) return null;

    const newListing: Listing = {
      id: nextId++,
      title: data.title,
      description: data.description,
      price: data.price,
      seller: data.seller,
      imageUrl: imageUrl,
      status: 'Available',
      category: data.category,
      rating: 0,
      reviews: 0,
    };

    listings.push(newListing);
    return newListing;
  }

  async buyListing(listingId: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const listing = listings.find(l => l.id === listingId);
    if (listing && listing.status === 'Available') {
      listing.status = 'Sold';
      return true;
    }
    
    return false;
  }
}

export const blockchainService = new BlockchainService();
