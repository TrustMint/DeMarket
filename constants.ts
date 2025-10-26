import React from 'react';
import { AllIcon } from './components/icons/AllIcon';
import { ElectronicsIcon } from './components/icons/ElectronicsIcon';
import { FashionIcon } from './components/icons/FashionIcon';
import { HomeIcon } from './components/icons/HomeIcon';
import { HobbiesIcon } from './components/icons/HobbiesIcon';
import { CarIcon } from './components/icons/CarIcon'; // New Icon
import { BookIcon } from './components/icons/BookIcon'; // New Icon

export const CATEGORIES: { name: string, icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { name: 'All', icon: AllIcon },
  { name: 'Electronics', icon: ElectronicsIcon },
  { name: 'Fashion', icon: FashionIcon },
  { name: 'Home & Garden', icon: HomeIcon },
  { name: 'Hobbies', icon: HobbiesIcon },
  { name: 'Auto', icon: CarIcon },
  { name: 'Books', icon: BookIcon },
];
