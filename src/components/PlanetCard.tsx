import React from 'react';
import { Planet } from '../types/pi';
import { useEmpireStore } from '../store/empireStore';
import { Cpu, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
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
  const { getPlanetStats } = useEmpireStore();
  const stats = getPlanetStats(planet.id);
  
  const cpuPercent = (stats.cpuUsed / stats.cpuMax) * 100;
  const pgPercent = (stats.pgUsed / stats.pgMax) * 100;

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

      {/* Resource Bars */}
      <div className="space-y-3 font-mono text-xs">
        {/* CPU */}
        <div>
          <div className="flex justify-between text-eve-text-muted mb-1">
            <span className="flex items-center gap-1"><Cpu size={12} /> CPU</span>
            <span className={cn(cpuPercent > 100 ? "text-eve-alert-red" : "text-white")}>
              {stats.cpuUsed.toLocaleString()} / {stats.cpuMax.toLocaleString()} tf
            </span>
          </div>
          <div className="h-1 bg-eve-dark-gray w-full rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-500", cpuPercent > 90 ? "bg-eve-alert-red" : "bg-eve-accent-blue")} 
              style={{ width: `${Math.min(cpuPercent, 100)}%` }} 
            />
          </div>
        </div>

        {/* Powergrid */}
        <div>
          <div className="flex justify-between text-eve-text-muted mb-1">
            <span className="flex items-center gap-1"><Zap size={12} /> PG</span>
            <span className={cn(pgPercent > 100 ? "text-eve-alert-red" : "text-white")}>
              {stats.pgUsed.toLocaleString()} / {stats.pgMax.toLocaleString()} MW
            </span>
          </div>
          <div className="h-1 bg-eve-dark-gray w-full rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-500", pgPercent > 90 ? "bg-eve-alert-red" : "bg-eve-accent-gold")} 
              style={{ width: `${Math.min(pgPercent, 100)}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
