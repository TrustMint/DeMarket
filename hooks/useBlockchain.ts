import { useState, useCallback } from 'react';
import type { Listing, NewListingData } from '../types';
import { blockchainService } from '../services/blockchainService';

export const useBlockchain = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const fetchedListings = await blockchainService.getListings();
      setListings(fetchedListings);
    } catch (e) {
      setError('Не удалось загрузить объявления.');
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const createListing = useCallback(async (data: NewListingData): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    try {
      const newListing = await blockchainService.createListing(data);
      if (newListing) {
        setListings(prev => [newListing, ...prev]);
        return true;
      }
      setError('Не удалось создать объявление в блокчейне.');
      return false;
    } catch (e) {
      setError('Произошла непредвиденная ошибка при создании объявления.');
      console.error(e);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, []);
  
  const buyListing = useCallback(async (listingId: number): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    try {
      const success = await blockchainService.buyListing(listingId);
      if (success) {
        // Update local state to reflect the change
        setListings(prev => prev.map(l => l.id === listingId ? { ...l, status: 'Sold' } : l));
        return true;
      }
      setError('Не удалось завершить транзакцию покупки.');
      return false;
    } catch (e) {
      setError('Во время покупки произошла непредвиденная ошибка.');
      console.error(e);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { listings, isProcessing, error, fetchListings, createListing, buyListing };
};
