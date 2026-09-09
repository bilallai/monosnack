import React from 'react';
import { Category, CategoryId } from '../types';
import { Salad, Flame, Sandwich, Pizza, IceCream, GlassWater, Utensils } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
  itemCounts: { [key: string]: number };
}

const getCategoryIcon = (id: CategoryId) => {
  switch (id) {
    case 'entrees-salades':
      return <Salad size={15} />;
    case 'plats-grillades':
      return <Flame size={15} />;
    case 'sandwichs-tacos':
      return <Sandwich size={15} />;
    case 'pizzas':
      return <Pizza size={15} />;
    case 'crepes-desserts':
      return <IceCream size={15} />;
    case 'boissons':
      return <GlassWater size={15} />;
    default:
      return <Utensils size={15} />;
  }
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  itemCounts,
}) => {
  return (
    <div className="bg-[#0B0B0E]/95 backdrop-blur-xl border-t border-b border-zinc-800/80 sticky top-[95px] sm:top-[99px] z-30 shadow-2xl py-1 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Category Tabs Scrollable Pill Bar */}
        <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {categories.map((cat) => {
            const count = itemCounts[cat.id] || 0;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-sans-body font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-zinc-950' : 'text-amber-400'}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-zinc-950 text-amber-400'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

