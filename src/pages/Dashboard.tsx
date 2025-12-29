import React, { useEffect } from 'react';
import { useEmpireStore } from '../store/empireStore';
import { PlanetCard } from '../components/PlanetCard';
import { Globe, RefreshCw, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterPlanets } from '../lib/esi';

export const Dashboard: React.FC = () => {
  const { planets, setPlanets } = useEmpireStore();
  const { activeCharacterId, characters } = useAuthStore();

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    enabled: !!activeCharacterId,
    queryKey: ['planets', activeCharacterId],
    queryFn: () => fetchCharacterPlanets(activeCharacterId as number),
    staleTime: 60_000
  });

  useEffect(() => {
    if (data) setPlanets(data);
  }, [data, setPlanets]);

  const activeCharacter = activeCharacterId ? characters[activeCharacterId] : null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-eve-border pb-4">
        <h2 className="text-2xl font-bold text-white uppercase flex items-center gap-2">
          <Globe className="text-eve-accent-blue" />
          Planetary Overview
        </h2>
        <div className="flex items-center gap-3 text-eve-text-muted text-xs uppercase tracking-widest">
          {activeCharacter && (
            <span className="text-eve-accent-blue">{activeCharacter.CharacterName}</span>
          )}
          <button 
            onClick={() => refetch()}
            className="flex items-center gap-2 bg-eve-accent-blue/10 hover:bg-eve-accent-blue/20 text-eve-accent-blue border border-eve-accent-blue/50 px-3 py-2 rounded transition-all text-xs font-semibold tracking-wider"
          >
            <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
            Sync
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-3 text-eve-alert-red bg-eve-panel/40 border border-eve-alert-red/40 px-4 py-3 rounded">
          <AlertTriangle size={18} />
          <div>
            <div className="font-semibold">ESI sync failed</div>
            <div className="text-sm text-eve-text-muted">{(error as Error).message}</div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-eve-text-muted">Contacting CONCORD servers...</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.values(planets).map(planet => (
          <PlanetCard 
            key={planet.id} 
            planet={planet} 
            onClick={() => console.log('Navigate to planet', planet.id)} 
          />
        ))}

        {Object.keys(planets).length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-eve-border rounded bg-eve-panel/30">
            <p className="text-eve-text-muted mb-4">No planetary signals detected.</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};
