
import React, { useState } from 'react';
import { useBlockchain } from '../hooks/useBlockchain';
import { useWallet } from '../context/WalletContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Spinner } from './ui/Spinner';
import { CATEGORIES } from '../constants';

interface CreateListingViewProps {
  onListingCreated: () => void;
}

export const CreateListingView: React.FC<CreateListingViewProps> = ({ onListingCreated }) => {
  const { createListing, isProcessing } = useBlockchain();
  const { isConnected, address } = useWallet();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState(CATEGORIES[1].name); // Default to first real category
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) {
      setError('Пожалуйста, подключите кошелек.');
      return;
    }
    if (!title || !description || !price || !imageFile || !category) {
      setError('Пожалуйста, заполните все поля и выберите изображение.');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Пожалуйста, введите корректную цену.');
      return;
    }

    setError('');
    const success = await createListing({
      title,
      description,
      price: priceNum,
      imageFile,
      seller: address,
      category,
    });
    
    if (success) {
      onListingCreated();
    } else {
      setError('Не удалось создать объявление. Пожалуйста, попробуйте еще раз.');
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center p-8 bg-surface rounded-lg">
        <h2 className="text-2xl font-bold">Для создания объявления необходимо подключить кошелек</h2>
        <p className="text-on-surface-secondary mt-2">Подключите свой кошелек, чтобы начать продавать на DeMarket.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-surface p-8 shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-center">Создать новое объявление</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Название</Label>
          <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например, ноутбук MacBook Pro" />
        </div>
        <div>
          <Label htmlFor="description">Описание</Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-border-color bg-surface-light px-3 py-2 text-on-surface placeholder-on-surface-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Опишите ваш товар..."
          />
        </div>
        <div>
          <Label htmlFor="category">Категория</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-border-color bg-surface-light px-3 py-2 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {CATEGORIES.filter(c => c.name !== 'All').map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="price">Цена (USDT)</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1500" />
        </div>
        <div>
          <Label htmlFor="image">Изображение</Label>
          <Input id="image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary-hover"/>
        </div>
        
        {error && <p className="text-sm text-error">{error}</p>}
        
        <Button type="submit" disabled={isProcessing} className="w-full">
          {isProcessing ? <><Spinner size="sm" /> Создание...</> : 'Создать объявление'}
        </Button>
      </form>
    </div>
  );
};
