import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { ListingGrid } from './components/ListingGrid';
import { ListingDetailView } from './components/ListingDetailView';
import { CreateListingView } from './components/CreateListingView';
import { Footer } from './components/Footer';
import { FilterPanel } from './components/FilterPanel';
import { CartView } from './components/CartView';
import { useBlockchain } from './hooks/useBlockchain';
import type { Listing, FilterState } from './types';

// Defines the possible views the user can see.
type View = 'grid' | 'detail' | 'create';

/**
 * The main application component.
 * It manages the global state for views, filters, search, and cart.
 * It also orchestrates the overall layout of the application.
 */
function App() {
  const { listings, fetchListings, isProcessing: isLoadingListings } = useBlockchain();
  const [view, setView] = useState<View>('grid');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // State for all active filters.
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 10000],
    minRating: 0,
  });

  // Fetch initial listings when the component mounts.
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Callback to update filters from the FilterPanel.
  const handleFilterChange = useCallback((name: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);
  
  // Memoized calculation to filter listings based on search and filters.
  // This re-runs only when its dependencies change, improving performance.
  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
        const searchMatch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || listing.description.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = filters.category === 'All' || listing.category === filters.category;
        const effectivePrice = listing.discountPrice ?? listing.price;
        const priceMatch = effectivePrice >= filters.priceRange[0] && effectivePrice <= filters.priceRange[1];
        const ratingMatch = listing.rating >= filters.minRating;
        
        return searchMatch && categoryMatch && priceMatch && ratingMatch;
    });
  }, [listings, searchQuery, filters]);

  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
    setView('detail');
  };

  const handleBack = () => {
    setSelectedListing(null);
    setView('grid');
    fetchListings(); // Refetch to get latest statuses
  };

  const handleShowCreateListing = () => {
    setView('create');
  };

  const handleListingCreated = () => {
    setView('grid');
    fetchListings();
  };
  
  const isInitialState = !searchQuery && filters.category === 'All' && filters.minRating === 0 && filters.priceRange[0] === 0 && filters.priceRange[1] === 10000;

  // Renders the main content area based on the current view state.
  const renderContent = () => {
    switch (view) {
      case 'detail':
        return selectedListing ? <ListingDetailView listing={selectedListing} onBack={handleBack} /> : null;
      case 'create':
        return <CreateListingView onListingCreated={handleListingCreated} />;
      case 'grid':
      default:
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Premium Hero Section: Only shows on the initial view */}
            {isInitialState && (
              <div className="p-10 text-center rounded-2xl bg-surface/80 border border-glass-border shadow-glass backdrop-blur-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50"></div>
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">Добро пожаловать в DeMarket</h1>
                  <p className="mt-4 text-lg text-on-surface-secondary max-w-2xl mx-auto">Премиальный, быстрый и безопасный маркетплейс будущего. Построен на децентрализованных технологиях.</p>
                </div>
              </div>
            )}
            <ListingGrid listings={filteredListings} onSelectListing={handleSelectListing} isLoading={isLoadingListings} />
          </div>
        );
    }
  };

  return (
      <div className="flex flex-col min-h-screen bg-background text-on-surface font-sans">
        <Header 
            onShowCreateListing={handleShowCreateListing} 
            onCartClick={() => setIsCartOpen(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
        {/* Main content layout with polished container */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sticky sidebar for filters */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-28 space-y-6">
                    <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
                  </div>
                </aside>
                {/* Main content area */}
                <div className="lg:col-span-3">
                    {renderContent()}
                </div>
            </div>
        </main>
        <Footer />
        <CartView isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
  );
}

export default App;
