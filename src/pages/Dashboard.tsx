import React, { useEffect, useMemo, useState } from 'react';
import { useEmpireStore } from '../store/empireStore';
import { PlanetCard } from '../components/PlanetCard';
import { Globe, RefreshCw, AlertTriangle, Cpu, Zap, BarChart2, Rocket, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterPlanets } from '../lib/esi';
import { cn } from '../components/PlanetCard';
import { MATERIALS } from '../data/schematics';
import { useMarketStore, isStale } from '../store/marketStore';

export const Dashboard: React.FC = () => {
  const { planets, simPlanets, setPlanets, mode, setMode, simSettings, updateSimSkills, updateSimTaxes, updateSimPlanet } = useEmpireStore();
  const { activeCharacterId, characters } = useAuthStore();
  const { prices, lastUpdated, status: priceStatus, refreshPrices, getPrice } = useMarketStore();
  const stalePrices = isStale(lastUpdated);
  const [editingPlanet, setEditingPlanet] = useState<number | null>(null);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    enabled: mode === 'live' && !!activeCharacterId,
    queryKey: ['planets', activeCharacterId],
    queryFn: () => fetchCharacterPlanets(activeCharacterId as number),
    staleTime: 60_000
  });

  useEffect(() => {
    if (mode === 'live' && data) setPlanets(data);
  }, [data, setPlanets, mode]);

  const activeCharacter = activeCharacterId ? characters[activeCharacterId] : null;
  const displayPlanets = mode === 'live' ? planets : simPlanets;

  const stats = useMemo(() => {
    const arr = Object.values(displayPlanets);
    if (arr.length === 0) return { count: 0, avgCC: 0, totalThroughput: 0, totalProfit: 0, totalValue: 0 };
    const count = arr.length;
    const avgCC = arr.reduce((s, p) => s + (p.upgradeLevel || 0), 0) / count;
    const totalThroughput = arr.reduce((s, p) => s + (p.throughputPerHour || 0), 0);
    const totalValue = arr.reduce((s, p) => {
      if (!p.outputMaterialId || !p.throughputPerHour) return s;
      const price = getPrice(p.outputMaterialId);
      if (!price) return s;
      return s + p.throughputPerHour * price.buyMax;
    }, 0);
    return { count, avgCC, totalThroughput, totalProfit: totalValue, totalValue };
  }, [displayPlanets, getPrice]);

  const outputOptions = useMemo(() => {
    return Object.values(MATERIALS)
      .filter(m => m.tier !== 'P0')
      .sort((a, b) => a.tier.localeCompare(b.tier) || a.name.localeCompare(b.name));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 border-b border-eve-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase flex items-center gap-2">
            <Globe className="text-eve-accent-blue" />
            Planetary Overview
          </h2>
          <p className="text-xs text-eve-text-muted font-mono">Digital Twin | Live + Simulation</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMode('live')}
            className={cn(
              "px-4 py-2 rounded border text-xs font-semibold tracking-wider uppercase",
              mode === 'live' ? "bg-eve-accent-blue/20 border-eve-accent-blue text-white" : "bg-eve-dark-gray border-eve-border text-eve-text-muted hover:text-white"
            )}
          >
            Live
          </button>
          <button
            onClick={() => setMode('simulation')}
            className={cn(
              "px-4 py-2 rounded border text-xs font-semibold tracking-wider uppercase",
              mode === 'simulation' ? "bg-eve-accent-blue/20 border-eve-accent-blue text-white" : "bg-eve-dark-gray border-eve-border text-eve-text-muted hover:text-white"
            )}
          >
            Simulation
          </button>
          {mode === 'live' && activeCharacter && (
            <span className="text-eve-accent-blue text-xs uppercase tracking-widest ml-2">{activeCharacter.CharacterName}</span>
          )}
          {mode === 'live' && (
            <button 
              onClick={() => refetch()}
              className="flex items-center gap-2 bg-eve-accent-blue/10 hover:bg-eve-accent-blue/20 text-eve-accent-blue border border-eve-accent-blue/50 px-3 py-2 rounded transition-all text-xs font-semibold tracking-wider"
            >
              <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
              Sync
            </button>
          )}
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

      <div className="mb-4 text-xs flex items-center gap-2 text-eve-text-muted">
        <div className={cn("px-3 py-1 rounded border", stalePrices ? "border-eve-alert-red text-eve-alert-red" : "border-eve-border")}>
          {stalePrices ? "Prices stale" : "Prices fresh"} {lastUpdated ? `(${new Date(lastUpdated).toLocaleTimeString()})` : "(not loaded)"}
        </div>
        <button
          onClick={() => refreshPrices()}
          className="flex items-center gap-2 bg-eve-accent-blue/10 hover:bg-eve-accent-blue/20 text-eve-accent-blue border border-eve-accent-blue/50 px-3 py-2 rounded transition-all text-xs font-semibold tracking-wider"
        >
          <RefreshCw size={14} className={priceStatus === 'loading' ? 'animate-spin' : ''} />
          Refresh Prices
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-eve-panel/50 border border-eve-border rounded p-4">
          <div className="text-xs uppercase text-eve-text-muted mb-1">Total Colonies</div>
          <div className="text-2xl text-white font-bold">{stats.count}</div>
        </div>
        <div className="bg-eve-panel/50 border border-eve-border rounded p-4">
          <div className="text-xs uppercase text-eve-text-muted mb-1 flex items-center gap-1"><Cpu size={12}/> Avg CC Level</div>
          <div className="text-2xl text-white font-bold">{stats.avgCC.toFixed(1)}</div>
        </div>
        <div className="bg-eve-panel/50 border border-eve-border rounded p-4">
          <div className="text-xs uppercase text-eve-text-muted mb-1 flex items-center gap-1"><Rocket size={12}/> Throughput / hr</div>
          <div className="text-2xl text-white font-bold">{stats.totalThroughput.toLocaleString()} units</div>
        </div>
        <div className="bg-eve-panel/50 border border-eve-border rounded p-4">
          <div className="text-xs uppercase text-eve-text-muted mb-1 flex items-center gap-1"><BarChart2 size={12}/> Value / hr</div>
          <div className="text-2xl text-eve-accent-blue font-bold">{stats.totalValue.toLocaleString()} ISK</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-eve-panel p-4 rounded border border-eve-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white uppercase">Skills (Simulation)</div>
              <div className="text-xs text-eve-text-muted">Affects PG/CPU and colony count</div>
            </div>
            <Shield size={18} className="text-eve-accent-blue" />
          </div>
          <div className="space-y-3 text-sm">
            <label className="block">
              <div className="flex justify-between text-eve-text-muted text-xs uppercase">
                <span>Interplanetary Consolidation</span>
                <span className="text-white">Level {simSettings.skills.interplanetaryConsolidation}</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                value={simSettings.skills.interplanetaryConsolidation}
                onChange={(e) => updateSimSkills({ interplanetaryConsolidation: Number(e.target.value) })}
                className="w-full"
              />
            </label>
            <label className="block">
              <div className="flex justify-between text-eve-text-muted text-xs uppercase">
                <span>Command Center Upgrades</span>
                <span className="text-white">Level {simSettings.skills.commandCenterUpgrades}</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={simSettings.skills.commandCenterUpgrades}
                onChange={(e) => updateSimSkills({ commandCenterUpgrades: Number(e.target.value) })}
                className="w-full"
              />
            </label>
            <label className="block">
              <div className="flex justify-between text-eve-text-muted text-xs uppercase">
                <span>Planetology</span>
                <span className="text-white">Level {simSettings.skills.planetology}</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={simSettings.skills.planetology}
                onChange={(e) => updateSimSkills({ planetology: Number(e.target.value) })}
                className="w-full"
              />
            </label>
          </div>
        </div>

        <div className="bg-eve-panel p-4 rounded border border-eve-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white uppercase">Taxation (Simulation)</div>
              <div className="text-xs text-eve-text-muted">Affects profit projections</div>
            </div>
            <Zap size={18} className="text-eve-accent-gold" />
          </div>
          <div className="space-y-3 text-sm">
            <label className="block">
              <div className="text-eve-text-muted text-xs uppercase mb-1">POCO Tax %</div>
              <input
                type="number"
                min={0}
                max={20}
                value={simSettings.taxes.poco}
                onChange={(e) => updateSimTaxes({ poco: Number(e.target.value) })}
                className="w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
              />
            </label>
            <label className="block">
              <div className="text-eve-text-muted text-xs uppercase mb-1">Export Tax %</div>
              <input
                type="number"
                min={0}
                max={20}
                value={simSettings.taxes.export}
                onChange={(e) => updateSimTaxes({ export: Number(e.target.value) })}
                className="w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
              />
            </label>
            <label className="block">
              <div className="text-eve-text-muted text-xs uppercase mb-1">Broker Fee %</div>
              <input
                type="number"
                min={0}
                max={10}
                value={simSettings.taxes.broker}
                onChange={(e) => updateSimTaxes({ broker: Number(e.target.value) })}
                className="w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
              />
            </label>
          </div>
        </div>

        <div className="bg-eve-panel p-4 rounded border border-eve-border">
          <div className="text-sm font-semibold text-white uppercase mb-3">Mode Guidance</div>
          <p className="text-sm text-eve-text-muted mb-3">Simulation mode lets you sandbox colonies with skills/taxes you can tweak. Switch back to Live to sync real ESI data.</p>
          <ul className="text-xs text-eve-text-muted space-y-1 list-disc list-inside">
            <li>Adjust skills to change colony caps and CC fitting margins.</li>
            <li>Taxes influence profit/hr projections on sim planets.</li>
            <li>Use Schematic Analyzer to size chains; map into sim planets.</li>
          </ul>
        </div>
      </div>

      {mode === 'live' && isLoading ? (
        <div className="text-eve-text-muted">Contacting CONCORD servers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.values(displayPlanets).map(planet => (
            <PlanetCard 
              key={planet.id} 
              planet={planet} 
              onClick={() => {
                if (mode === 'simulation') setEditingPlanet(planet.id);
              }} 
              readOnly={mode === 'live'}
              pricePerUnit={planet.outputMaterialId ? getPrice(planet.outputMaterialId)?.buyMax : undefined}
              revenuePerHour={planet.outputMaterialId && planet.throughputPerHour ? (getPrice(planet.outputMaterialId)?.buyMax || 0) * planet.throughputPerHour : undefined}
            />
          ))}

          {Object.keys(displayPlanets).length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-eve-border rounded bg-eve-panel/30">
              <p className="text-eve-text-muted mb-4">{mode === 'live' ? 'No planetary signals detected.' : 'No simulated colonies yet.'}</p>
            </div>
          )}
        </div>
      )}

      {mode === 'simulation' && editingPlanet && (() => {
        const p = simPlanets[editingPlanet];
        if (!p) return null;
        const price = p.outputMaterialId ? getPrice(p.outputMaterialId) : undefined;
        const revenue = p.outputMaterialId && p.throughputPerHour ? (price?.buyMax || 0) * p.throughputPerHour : 0;
        return (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-eve-panel border border-eve-border rounded-lg shadow-2xl w-full max-w-2xl p-6 relative">
              <h3 className="text-lg font-bold text-white mb-4">Edit Simulated Planet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <label className="block">
                  <span className="text-eve-text-muted text-xs uppercase">Name</span>
                  <input
                    className="mt-1 w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
                    value={p.name}
                    onChange={(e) => updateSimPlanet(p.id, { name: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="text-eve-text-muted text-xs uppercase">Type</span>
                  <select
                    className="mt-1 w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
                    value={p.type}
                    onChange={(e) => updateSimPlanet(p.id, { type: e.target.value as any })}
                  >
                    {['Barren','Gas','Ice','Lava','Oceanic','Plasma','Storm','Temperate'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-eve-text-muted text-xs uppercase">Upgrade Level</span>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    className="mt-1 w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
                    value={p.upgradeLevel}
                    onChange={(e) => updateSimPlanet(p.id, { upgradeLevel: Number(e.target.value) })}
                  />
                </label>
                <label className="block">
                  <span className="text-eve-text-muted text-xs uppercase">Throughput / hr</span>
                  <input
                    type="number"
                    min={0}
                    className="mt-1 w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
                    value={p.throughputPerHour || 0}
                    onChange={(e) => updateSimPlanet(p.id, { throughputPerHour: Number(e.target.value) })}
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-eve-text-muted text-xs uppercase">Output Material</span>
                  <select
                    className="mt-1 w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
                    value={p.outputMaterialId || ''}
                    onChange={(e) => updateSimPlanet(p.id, { outputMaterialId: Number(e.target.value) })}
                  >
                    <option value="">Select...</option>
                    {outputOptions.map(mat => (
                      <option key={mat.id} value={mat.id}>{mat.name} ({mat.tier})</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-eve-text-muted text-xs uppercase">POCO Tax %</span>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    className="mt-1 w-full bg-eve-dark-gray border border-eve-border text-white rounded px-3 py-2"
                    value={p.pocoTax ?? simSettings.taxes.poco}
                    onChange={(e) => updateSimPlanet(p.id, { pocoTax: Number(e.target.value) })}
                  />
                </label>
              </div>

              <div className="mt-4 bg-eve-dark-gray border border-eve-border rounded p-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-eve-text-muted">Unit Price (buy)</span>
                  <span className="text-white font-mono">{price?.buyMax ? price.buyMax.toLocaleString() + ' ISK' : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-eve-text-muted">Throughput Value/hr</span>
                  <span className="text-eve-accent-blue font-mono">{revenue ? revenue.toLocaleString() + ' ISK' : 'N/A'}</span>
                </div>
                {stalePrices && <div className="text-[11px] text-eve-alert-red mt-1 uppercase">Prices stale</div>}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setEditingPlanet(null)}
                  className="px-4 py-2 rounded border border-eve-border text-eve-text-muted hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
