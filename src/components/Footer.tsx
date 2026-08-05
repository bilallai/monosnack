import React from 'react';
import { RestaurantInfo } from '../types';
import { MapPin, Phone, Clock, ShieldCheck, UtensilsCrossed } from 'lucide-react';

interface FooterProps {
  info: RestaurantInfo;
}

export const Footer: React.FC<FooterProps> = ({ info }) => {
  return (
    <footer className="bg-[#09090B] text-zinc-300 pt-12 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-800/80">
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
                <UtensilsCrossed size={18} />
              </div>
              <h3 className="font-serif-display font-extrabold text-2xl tracking-tight text-white">
                <span className="text-amber-400">MONO</span> SNACK
              </h3>
            </div>
            <p className="text-xs font-mono-code text-amber-400 uppercase tracking-wide font-medium">
              {info.slogan}
            </p>
            <p className="text-xs font-sans-body text-zinc-400 leading-relaxed">
              Menu numérique haute définition. Découvrez notre sélection exclusive de plats traditionnels, burgers, pizzas artisanales et crêpes gourmandes.
            </p>
          </div>

          {/* Column 2: Hours & Location */}
          <div className="space-y-3 text-xs font-sans-body">
            <h4 className="font-mono-code uppercase font-bold text-amber-400 tracking-wider text-[11px]">
              Horaires & Informations
            </h4>
            <div className="space-y-2">
              <div className="flex items-center text-zinc-300">
                <MapPin className="w-3.5 h-3.5 mr-2 text-amber-500 shrink-0" />
                <span>{info.address}</span>
              </div>
              <div className="flex items-center text-zinc-300">
                <Phone className="w-3.5 h-3.5 mr-2 text-amber-500 shrink-0" />
                <span>{info.phone}</span>
              </div>
              <div className="flex items-center text-zinc-300">
                <Clock className="w-3.5 h-3.5 mr-2 text-amber-500 shrink-0" />
                <span>{info.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quality Notice */}
          <div className="space-y-3 text-xs font-sans-body">
            <h4 className="font-mono-code uppercase font-bold text-amber-400 tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Engagement Qualité
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Toutes nos préparations sont réalisées avec des ingrédients frais, viandes certifiées de qualité, sauces maison et hygiène irréprochable.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-zinc-500 gap-2">
          <div>© {new Date().getFullYear()} MONO SNACK. Tous droits réservés.</div>
          <div className="flex items-center space-x-2 text-amber-400 font-medium">
            <span>MENU NUMÉRIQUE HAUTE RÉSOLUTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

