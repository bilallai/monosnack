import React, { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from './data/menuData';
import { CategoryId, MenuItem } from './types';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { Footer } from './components/Footer';
import { Search, X, LayoutGrid, List, Sparkles, ShieldCheck, Heart, Share2, Utensils, Check } from 'lucide-react';

import heroImage from './assets/images/hero_mono_snack_feast_1785936129415.jpg';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('entrees-salades');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Selected Category Info
  const currentCategoryInfo = useMemo(() => {
    return CATEGORIES.find((cat) => cat.id === activeCategory) || CATEGORIES[0];
  }, [activeCategory]);

  // Filtered Menu Items based on category or search query
  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;
    
    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    } else {
      // Otherwise filter by active category
      items = items.filter((item) => item.category === activeCategory);
    }

    return items;
  }, [activeCategory, searchQuery]);

  // Counts per category
  const itemCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = MENU_ITEMS.filter((item) => item.category === cat.id).length;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-zinc-100 font-sans-body flex flex-col bg-glow-radial selection:bg-amber-500 selection:text-zinc-950">
      {/* Header */}
      <Header info={RESTAURANT_INFO} />

      {/* Main Catalog View */}
      <main className="flex-1 pb-16">
        {/* Category Navigation Tabs */}
        <CategoryNav
          categories={CATEGORIES}
          activeCategory={activeCategory}
          setActiveCategory={(cat) => {
            setActiveCategory(cat);
            setSearchQuery(''); // Clear search when switching tabs
          }}
          itemCounts={itemCounts}
        />

        {/* Catalog List Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* Top Control Bar: Search & Grid/List Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Menu Search Bar */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-3.5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un plat (ex: Chawarma, Pizza, Tacos, Houmous, Crêpe)..."
                className="w-full pl-11 pr-10 py-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-sm font-sans-body focus:outline-none focus:border-amber-500/80 text-white placeholder-zinc-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-white p-0.5 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* View Layout Toggle */}
            <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-2xl border border-zinc-800 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                title="Vue Grille"
                className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">Grille</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="Vue Liste"
                className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <List size={16} />
                <span className="hidden sm:inline">Liste</span>
              </button>
            </div>
          </div>

          {/* Showcase Hero Banner (only when not searching) */}
          {!searchQuery && (
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950 group">
              <img
                src={heroImage}
                alt="Mono Snack Specialités"
                referrerPolicy="no-referrer"
                className="w-full h-48 sm:h-64 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">

                <h2 className="font-serif-display text-2xl sm:text-4xl text-white font-extrabold tracking-tight">
                  GRILLADES • TACOS • PIZZAS • CRÊPES
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl font-sans-body">
                  Découvrez une expérience gustative d'exception avec nos plats fraîchement préparés, nos sauces maison et nos recettes traditionnelles.
                </p>
              </div>
            </div>
          )}

          {/* Active Category / Search Results Header */}
          <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-amber-500">
            <div>
              <h2 className="font-serif-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                {searchQuery ? `Résultats de recherche ("${searchQuery}")` : currentCategoryInfo.name}
              </h2>
              <p className="text-xs text-zinc-400 mt-1 font-sans-body">
                {searchQuery ? 'Tous les plats correspondant à votre recherche dans la carte' : currentCategoryInfo.subtitle}
              </p>
            </div>
            <span className="text-xs font-mono-code bg-amber-500/10 text-amber-400 font-bold px-3.5 py-1.5 rounded-2xl border border-amber-500/30 shrink-0 self-start sm:self-auto">
              {filteredItems.length} plat{filteredItems.length > 1 ? 's' : ''} disponible{filteredItems.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Menu Items Container */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'space-y-3.5'
            }
          >
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                viewMode={viewMode}
                currencySymbol={RESTAURANT_INFO.currencySymbol}
                onSelectDish={(dish) => setSelectedDish(dish)}
              />
            ))}

            {filteredItems.length === 0 && (
              <div className="col-span-full bg-zinc-900/80 border border-zinc-800 rounded-3xl p-10 text-center space-y-3">
                <Utensils className="mx-auto text-amber-500/60" size={32} />
                <p className="font-serif-display text-xl font-bold text-white">
                  Aucun plat ne correspond à votre recherche.
                </p>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Essayez avec un autre mot-clé comme "Pizza", "Poulet", "Chawarma", "Tacos" ou "Crêpe".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 px-5 py-2.5 bg-amber-500 text-zinc-950 text-xs font-sans-body font-bold rounded-2xl hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Effacer la recherche
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 z-10 bg-zinc-950/80 text-zinc-400 hover:text-white p-2 rounded-full border border-zinc-800 backdrop-blur-md transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Image Header */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <span className="bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono-code text-xs font-bold px-3 py-1 rounded-full">
                  Recette Authentique
                </span>
                <span className="bg-amber-500 text-zinc-950 font-mono-code font-black px-4 py-2 rounded-2xl text-base shadow-xl">
                  {selectedDish.price} {RESTAURANT_INFO.currencySymbol}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-serif-display font-extrabold text-2xl text-white">
                  {selectedDish.name}
                </h3>
                <p className="text-xs text-amber-400/90 font-mono-code mt-0.5">
                  Préparation fraîche à la commande • Mono Snack
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-sans-body">
                {selectedDish.description}
              </p>

              <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                  <ShieldCheck size={16} className="text-amber-500" />
                  <span>Garantie de Fraîcheur & Qualité</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Ingrédients de premier choix préparés selon la tradition culinaire authentique pour un goût inégalé.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setSelectedDish(null)}
                  className="w-full py-3 bg-amber-500 text-zinc-950 font-sans-body font-bold text-sm rounded-2xl hover:bg-amber-400 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  <span>Fermer la vue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer info={RESTAURANT_INFO} />
    </div>
  );
}



