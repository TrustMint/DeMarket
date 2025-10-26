export type ListingStatus = 'Available' | 'Sold' | 'InProgress';

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice?: number; // Optional discount price
  seller: string;
  imageUrl: string;
  status: ListingStatus;
  category: string;
  rating: number; // Rating out of 5
  reviews: number; // Number of reviews
}

export interface NewListingData {
  title: string;
  description: string;
  price: number;
  imageFile: File;
  seller: string;
  category: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

export interface CartItem {
  listing: Listing;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (listing: Listing) => void;
  removeFromCart: (listingId: number) => void;
  updateQuantity: (listingId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface FilterState {
    category: string;
    priceRange: [number, number];
    minRating: number;
}
