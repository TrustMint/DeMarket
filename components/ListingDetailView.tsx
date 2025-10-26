import React, { useState } from 'react';
import type { Listing } from '../types';
import { useWallet } from '../context/WalletContext';
import { useBlockchain } from '../hooks/useBlockchain';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { Spinner } from './ui/Spinner';
import { Rating } from './Rating';

interface ListingDetailViewProps {
  listing: Listing;
  onBack: () => void;
}

export const ListingDetailView: React.FC<ListingDetailViewProps> = ({ listing, onBack }) => {
    const { isConnected, address } = useWallet();
    const { buyListing, isProcessing, error } = useBlockchain();
    const { addToCart } = useCart();
    const [mainImage, setMainImage] = useState(listing.imageUrl);

    // Mock gallery images
    const galleryImages = [
        listing.imageUrl,
        listing.imageUrl.replace('seed/', 'seed/a'),
        listing.imageUrl.replace('seed/', 'seed/b'),
        listing.imageUrl.replace('seed/', 'seed/c'),
    ];

    const isOwner = isConnected && address?.toLowerCase() === listing.seller.toLowerCase();

    const handleBuy = async () => {
        if (confirm(`Вы уверены, что хотите купить "${listing.title}"?`)) {
            const success = await buyListing(listing.id);
            if (success) {
                alert("Поздравляем! Средства заблокированы. Продавец скоро отправит товар.");
                onBack();
            }
        }
    };

    const handleAddToCart = () => {
        addToCart(listing);
        alert(`"${listing.title}" добавлен в корзину.`);
    }
    
    return (
        <div className="animate-fade-in">
            <Button onClick={onBack} variant="secondary" className="mb-8">
                &larr; Назад
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 bg-surface/80 rounded-xl border border-glass-border p-6 md:p-8 shadow-glass backdrop-blur-xl">
                {/* Image Gallery */}
                <div className="lg:col-span-3 flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-2 justify-center">
                        {galleryImages.map((img, index) => (
                            <img 
                                key={index}
                                src={img} 
                                alt={`Thumbnail ${index + 1}`} 
                                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                    <div className="flex-1">
                        <img src={mainImage} alt={listing.title} className="w-full h-auto object-cover rounded-xl shadow-lg"/>
                    </div>
                </div>

                {/* Details and Actions */}
                <div className="lg:col-span-2 flex flex-col">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-on-surface">{listing.title}</h1>
                    <div className="flex items-center mb-4">
                        <Rating value={listing.rating} />
                        <span className="text-sm text-on-surface-secondary ml-3">({listing.reviews} отзывов)</span>
                    </div>
                    <p className="text-on-surface-secondary mb-6 flex-grow">{listing.description}</p>
                    
                    <div className="bg-surface-light p-6 rounded-xl border border-glass-border">
                        <div className="flex items-baseline gap-3 mb-6">
                            <p className={`font-bold text-4xl ${listing.discountPrice ? 'text-error' : 'text-primary'}`}>
                                ${(listing.discountPrice ?? listing.price).toLocaleString('en-US')}
                            </p>
                            {listing.discountPrice && (
                                <p className="text-xl text-on-surface-secondary line-through">
                                    ${listing.price.toLocaleString('en-US')}
                                </p>
                            )}
                        </div>
                        
                        {isOwner ? <p className="text-center text-on-surface-secondary">Это ваше объявление.</p> :
                         listing.status !== 'Available' ? <p className="text-center font-bold text-yellow-400">Товар недоступен.</p> :
                         !isConnected ? <p className="text-center text-on-surface-secondary">Подключите кошелек для покупки.</p> :
                        (
                          <div className="space-y-4">
                            <Button onClick={handleBuy} disabled={isProcessing} className="w-full !py-3 text-base">
                                {isProcessing ? <><Spinner size="sm" /> Обработка...</> : 'Купить сейчас'}
                            </Button>
                            <Button onClick={handleAddToCart} variant="secondary" className="w-full !py-3 text-base">
                                Добавить в корзину
                            </Button>
                            {error && <p className="mt-2 text-sm text-center text-error">{error}</p>}
                          </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
