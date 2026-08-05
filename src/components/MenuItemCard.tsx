import React from 'react';
import { MenuItem } from '../types';
import { Sparkles, Eye } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  currencySymbol?: string;
  viewMode?: 'grid' | 'list';
  onSelectDish?: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  currencySymbol = 'DA',
  viewMode = 'grid',
  onSelectDish,
}) => {
  const handleClick = () => {
    if (onSelectDish) {
      onSelectDish(item);
    }
  };

  if (viewMode === 'grid') {
    return (
      <div
        onClick={handleClick}
        className="group modern-card rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer border border-zinc-800/80 bg-zinc-900/90 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-amber-500/10"
      >
        <div>
          {/* High-Res Food Photo Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

            {/* Price Tag Overlay */}
            <div className="absolute bottom-3 right-3">
              <span className="bg-zinc-950/90 backdrop-blur-md text-amber-400 font-mono-code font-black px-3 py-1.5 rounded-xl text-sm border border-amber-500/30 shadow-md">
                {item.price} {currencySymbol}
              </span>
            </div>

            {/* Quick Preview Badge */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-amber-500 text-zinc-950 p-2 rounded-full shadow-lg flex items-center justify-center">
                <Eye size={14} />
              </span>
            </div>
          </div>

          {/* Dish Details */}
          <div className="p-4 space-y-2">
            <h3 className="font-serif-display font-bold text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors leading-snug">
              {item.name}
            </h3>

            <p className="text-xs text-zinc-400 font-sans-body leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-zinc-800/40">
          <span className="text-[11px] font-mono-code text-zinc-500 flex items-center gap-1">
            <Sparkles size={12} className="text-amber-500" />
            Spécialité Maison
          </span>
          <span className="text-xs font-sans-body text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
            Voir détail →
          </span>
        </div>
      </div>
    );
  }

  // Compact List View Layout
  return (
    <div
      onClick={handleClick}
      className="group modern-card rounded-2xl p-3.5 sm:p-4 flex flex-row items-center justify-between gap-4 cursor-pointer border border-zinc-800/80 bg-zinc-900/90 hover:border-amber-500/50 transition-all duration-300 shadow-md"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Food Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-zinc-800 shrink-0 bg-zinc-950">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Dish Title & Description */}
        <div className="space-y-1 flex-1 min-w-0">
          <h3 className="font-serif-display font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
            {item.name}
          </h3>

          <p className="text-xs text-zinc-400 font-sans-body leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      {/* Price Tag */}
      <div className="flex items-center gap-2 shrink-0 pl-2">
        <span className="bg-amber-500/10 text-amber-400 font-mono-code font-bold px-3.5 py-2 rounded-xl text-sm sm:text-base border border-amber-500/30 whitespace-nowrap">
          {item.price} {currencySymbol}
        </span>
      </div>
    </div>
  );
};




