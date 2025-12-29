import React from 'react';
import { useEmpireStore } from '../store/empireStore';
import { PlanetCard } from '../components/PlanetCard';
import { Plus, Globe } from 'lucide-react';
import { Planet } from '../types/pi';

export const Dashboard: React.FC = () => {
  const { planets, addPlanet } = useEmpireStore();
  
  const handleAddTestPlanet = () => {
    const newPlanet: Planet = {
      id: Date.now(),
      name: `Colony ${Object.keys(planets).length + 1}`,
      type: 'Temperate',
      radius: 6000,
      systemId: 30000142,
      upgradeLevel: 4
    };
    addPlanet(newPlanet);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-eve-border pb-4">
        <h2 className="text-2xl font-bold text-white uppercase flex items-center gap-2">
          <Globe className="text-eve-accent-blue" />
          Planetary Overview
        </h2>
        <button 
          onClick={handleAddTestPlanet}
          className="flex items-center gap-2 bg-eve-accent-blue/10 hover:bg-eve-accent-blue/20 text-eve-accent-blue border border-eve-accent-blue/50 px-4 py-2 rounded transition-all uppercase text-sm font-semibold tracking-wider"
        >
          <Plus size={16} />
          Add Colony
        </button>
      </div>

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
            <button 
               onClick={handleAddTestPlanet}
               className="text-white underline hover:text-eve-accent-blue"
            >
              Initialize new colony
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
