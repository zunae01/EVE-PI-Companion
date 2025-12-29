import React from 'react';
import { Planet } from '../types/pi';
import { Cpu, Zap, Radio, GitBranch } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface PlanetCardProps {
  planet: Planet;
  onClick: () => void;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const PlanetCard: React.FC<PlanetCardProps> = ({ planet, onClick }) => {
  const formatTimestamp = (ts?: string) => {
    if (!ts) return 'Unknown';
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return ts;
    return d.toLocaleString();
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-eve-panel border border-eve-border rounded-sm p-4 hover:border-eve-accent-blue transition-all cursor-pointer overflow-hidden"
    >
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-eve-accent-blue opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide uppercase">{planet.name}</h3>
          <span className="text-xs text-eve-accent-blue font-mono uppercase tracking-wider">{planet.type} Planet</span>
        </div>
        <div className="flex items-center gap-2">
           {/* Status Indicator placeholder */}
           <div className="h-2 w-2 rounded-full bg-eve-success shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
        </div>
      </div>

      <div className="space-y-3 font-mono text-xs text-eve-text-muted">
        <div className="flex justify-between">
          <span className="flex items-center gap-1"><Cpu size={12} /> Upgrade</span>
          <span className="text-white">CC {planet.upgradeLevel}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1"><Radio size={12} /> Pins/Links</span>
          <span className="text-white">{planet.numPins ?? 0} / {planet.numLinks ?? 0}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1"><GitBranch size={12} /> Routes</span>
          <span className="text-white">{planet.numRoutes ?? 0}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1"><Zap size={12} /> Last Update</span>
          <span className="text-white text-right">{formatTimestamp(planet.lastUpdate)}</span>
        </div>
      </div>
    </div>
  );
};
