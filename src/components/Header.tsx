import React from 'react';
import { Clock, MapPin, Phone, Sparkles, UtensilsCrossed } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface HeaderProps {
  info: RestaurantInfo;
}

export const Header: React.FC<HeaderProps> = ({ info }) => {
  return (
    <header className="sticky top-0 z-40 glass-header transition-all">
      {/* Top Notification / Info Strip */}
      <div className="bg-[#09090B]/95 border-b border-zinc-800/80 text-zinc-300 px-4 py-1.5 text-xs font-sans-body">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-5 shrink-0">
            <span className="flex items-center text-zinc-400 hover:text-zinc-200 transition-colors">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              {info.address}
            </span>
            <span className="hidden md:inline-flex items-center text-zinc-400">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              {info.hours}
            </span>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <a
              href={`tel:${info.phone}`}
              className="flex items-center text-zinc-300 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              <span>{info.phone}</span>
            </a>
            <span className="inline-flex items-center bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] text-amber-400 font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
              OUVERT AUJOURD'HUI
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand & Slogan */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-black p-0.5 shadow-lg shadow-amber-500/20 shrink-0 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex flex-col items-center justify-center">
              <UtensilsCrossed size={20} className="text-amber-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-display text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center">
                <span className="text-amber-400 italic mr-0.5">M</span>ONO SNACK
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono-code font-bold uppercase px-2.5 py-0.5 bg-zinc-800/90 border border-zinc-700 text-amber-400 rounded-full">
                <Sparkles size={10} />
                DIGITAL MENU
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-body font-medium tracking-wide">
              {info.slogan}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};



