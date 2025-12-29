import React, { useEffect, useMemo, useState } from 'react';
import { MATERIALS, SCHEMATICS } from '../data/schematics';
import { Material } from '../types/pi';
import { buildProductionTree, ProductionNode, getRawRequirements } from '../lib/chain';
import { ChevronRight, ChevronDown, Package, Box, Gauge, RefreshCw, AlertTriangle } from 'lucide-react';
import { cn } from '../components/PlanetCard';
import { useMarketStore, isStale } from '../store/marketStore';

type SchematicByOutput = Record<number, typeof SCHEMATICS[keyof typeof SCHEMATICS]>;
type PlanetResourceMap = Record<string, string[]>;

const planetResourceMap: PlanetResourceMap = {
  Barren: ['Aqueous Liquids', 'Base Metals', 'Noble Metals', 'Carbon Compounds', 'Microorganisms'],
  Temperate: ['Autotrophs', 'Base Metals', 'Noble Metals', 'Carbon Compounds', 'Microorganisms'],
  Oceanic: ['Aqueous Liquids', 'Carbon Compounds', 'Microorganisms', 'Planktic Colonies', 'Complex Organisms'],
  Storm: ['Aqueous Liquids', 'Ionic Solutions', 'Noble Gas', 'Reactive Gas', 'Suspended Plasma'],
  Gas: ['Aqueous Liquids', 'Ionic Solutions', 'Noble Gas', 'Reactive Gas', 'Suspended Plasma'],
  Ice: ['Aqueous Liquids', 'Heavy Metals', 'Noble Gas', 'Planktic Colonies', 'Suspended Plasma'],
  Lava: ['Base Metals', 'Felsic Magma', 'Heavy Metals', 'Non-CS Crystals', 'Suspended Plasma'],
  Plasma: ['Base Metals', 'Felsic Magma', 'Heavy Metals', 'Noble Metals', 'Suspended Plasma']
};

const MaterialHoverCard: React.FC<{
  materialId: number;
  schematicByOutput: SchematicByOutput;
  qty?: number;
  getPrice: (id: number) => { buyMax: number; sellMin: number } | undefined;
  stale: boolean;
  children: React.ReactNode;
}> = ({ materialId, schematicByOutput, qty, getPrice, stale, children }) => {
  const [open, setOpen] = useState(false);
  const material = MATERIALS[materialId];
  const schematic = schematicByOutput[materialId];
  const inputs = schematic?.inputs ?? [];
  const price = getPrice(materialId);
  const stackBuy = price ? (qty ?? 0) * price.buyMax : undefined;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && material && (
        <div className="absolute z-30 mt-2 min-w-[260px] max-w-xs bg-eve-panel border border-eve-border rounded shadow-xl p-3 text-left left-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">{material.name}</div>
              <div className="text-xs text-eve-text-muted uppercase">Tier {material.tier}</div>
            </div>
            <span className="text-[10px] font-mono text-eve-accent-blue">{material.volume.toLocaleString()} m3</span>
          </div>

          {material.description && (
            <p className="mt-2 text-xs text-eve-text-muted leading-snug line-clamp-4">{material.description}</p>
          )}

          {material.planetTypes && (
            <div className="mt-2 space-y-2">
              <div>
                <div className="text-[11px] text-eve-text-muted uppercase mb-1">Found on</div>
                <div className="flex flex-wrap gap-1">
                  {material.planetTypes.map(pt => (
                    <span key={pt} className="text-[11px] text-white bg-eve-dark-gray px-2 py-1 rounded border border-eve-border/50">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
              {material.planetTypes.map(pt => {
                const resources = planetResourceMap[pt] || [];
                if (!resources.length) return null;
                return (
                  <div key={pt} className="space-y-1">
                    <div className="text-[11px] text-eve-text-muted uppercase">Other raw resources on {pt}</div>
                    <div className="flex flex-wrap gap-1">
                      {resources.map(name => (
                        <span
                          key={`${pt}-${name}`}
                          className="text-[11px] px-2 py-1 rounded border bg-eve-dark-gray text-eve-text-muted border-eve-border/50"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {price && (
            <div className="mt-3 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-eve-text-muted">Sell (input)</span>
                <span className="text-white font-mono">{price.sellMin.toLocaleString()} ISK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-eve-text-muted">Buy (output)</span>
                <span className="text-white font-mono">{price.buyMax.toLocaleString()} ISK</span>
              </div>
              {qty !== undefined && (
                <div className="flex justify-between">
                  <span className="text-eve-text-muted">Stack value (qty x buy)</span>
                  <span className="text-eve-accent-blue font-mono">{stackBuy?.toLocaleString()}</span>
                </div>
              )}
              {stale && <div className="text-[10px] text-eve-alert-red uppercase">Stale prices</div>}
            </div>
          )}

          {schematic ? (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs text-eve-text-muted">
                <span>Cycle</span>
                <span className="text-white font-mono">{schematic.cycleTime / 60} min</span>
              </div>
              <div>
                <div className="text-[11px] text-eve-text-muted uppercase mb-1">Inputs</div>
                <div className="space-y-1">
                  {inputs.map(inp => {
                    const mat = MATERIALS[inp.materialId];
                    return (
                      <div key={inp.materialId} className="flex items-center justify-between text-xs">
                        <span className="text-white">{mat?.name || inp.materialId}</span>
                        <span className="font-mono text-eve-accent-blue">x{inp.quantity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 text-xs text-eve-text-muted">No schematic (raw output)</div>
          )}
        </div>
      )}
    </div>
  );
};

const TreeNode: React.FC<{
  node: ProductionNode;
  depth?: number;
  schematicByOutput: SchematicByOutput;
  getPrice: (id: number) => { buyMax: number; sellMin: number } | undefined;
  stale: boolean;
}> = ({ node, depth = 0, schematicByOutput, getPrice, stale }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;
  const price = getPrice(node.material.id);
  const stackBuy = price ? node.quantity * price.buyMax : undefined;

  return (
    <div className="ml-4 border-l border-eve-border pl-4 relative">
        <div className="absolute -left-[1px] top-3 w-4 h-px bg-eve-border" />
        
        <div className="flex items-center gap-2 py-1">
            {hasChildren && (
                <button onClick={() => setExpanded(!expanded)} className="text-eve-text-muted hover:text-white">
                    {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
            )}
            {!hasChildren && <div className="w-[14px]" />}

            <MaterialHoverCard materialId={node.material.id} schematicByOutput={schematicByOutput} qty={node.quantity} getPrice={getPrice} stale={stale}>
              <div className={cn("flex items-center gap-2 px-2 py-1 rounded border", 
                  hasChildren ? "bg-eve-panel border-eve-border" : "bg-eve-dark-gray border-transparent")}>
                  <span className={cn("text-xs font-mono px-1 rounded", 
                      node.material.tier === 'P0' ? "bg-eve-accent-blue/20 text-eve-accent-blue" :
                      node.material.tier === 'P1' ? "bg-eve-success/20 text-eve-success" :
                      "bg-orange-500/20 text-orange-400"
                  )}>
                      {node.material.tier}
                  </span>
                  <span className="text-sm text-gray-200">{node.material.name}</span>
                  <span className="text-xs text-eve-text-muted font-mono">x{node.quantity.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                  <span className="text-xs text-eve-text-muted border-l border-eve-border pl-2 ml-1 flex items-center gap-1">
                      <Box size={10} />
                      {node.totalVolume.toLocaleString(undefined, { maximumFractionDigits: 1 })} m3
                  </span>
                  {price && (
                    <span className="text-[11px] text-eve-accent-blue border-l border-eve-border pl-2 ml-1">
                      {stackBuy?.toLocaleString(undefined, { maximumFractionDigits: 0 })} ISK
                    </span>
                  )}
              </div>
            </MaterialHoverCard>
        </div>

        {expanded && node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} schematicByOutput={schematicByOutput} getPrice={getPrice} stale={stale} />
        ))}
    </div>
  );
};

export const SchematicAnalyzer: React.FC = () => {
    const outputs = useMemo(() => Object.values(SCHEMATICS).map(s => ({
        material: MATERIALS[s.output.materialId],
        schematic: s
    })).filter(o => !!o.material), []);

    const [selectedId, setSelectedId] = useState<number>(outputs[0]?.material.id ?? 0); 
    const [targetPerHour, setTargetPerHour] = useState<number>(100);
    const [query, setQuery] = useState('');
    const [tierFilter, setTierFilter] = useState<Material['tier'] | 'ALL'>('ALL');

    const { prices, lastUpdated, status, error: priceError, refreshPrices, getPrice } = useMarketStore();
    const priceLookup = useMemo(() => (id: number) => prices[id], [prices]);
    const stalePrices = isStale(lastUpdated);

    const schematic = useMemo(() => outputs.find(o => o.material.id === selectedId)?.schematic, [outputs, selectedId]);
    const cyclesPerHour = schematic ? 3600 / schematic.cycleTime : 0;
    const perCycle = schematic?.output.quantity ?? 0;
    const factoriesNeeded = schematic && cyclesPerHour > 0 ? Math.max(1, Math.ceil(targetPerHour / (perCycle * cyclesPerHour))) : 0;

    const schematicByOutput: SchematicByOutput = useMemo(() => {
      const map: SchematicByOutput = {};
      Object.values(SCHEMATICS).forEach(s => {
        map[s.output.materialId] = s;
      });
      return map;
    }, []);

    const filteredOutputs = useMemo(() => {
      const q = query.trim().toLowerCase();
      return outputs
        .filter(({ material }) => {
          if (tierFilter !== 'ALL' && material.tier !== tierFilter) return false;
          if (!q) return true;
          return material.name.toLowerCase().includes(q);
        })
        .sort((a, b) => {
          if (a.material.tier === b.material.tier) return a.material.name.localeCompare(b.material.name);
          return a.material.tier < b.material.tier ? -1 : 1;
        });
    }, [outputs, query, tierFilter]);

    useEffect(() => {
      const exists = filteredOutputs.some(o => o.material.id === selectedId);
      if (!exists && filteredOutputs[0]) {
        setSelectedId(filteredOutputs[0].material.id);
      }
    }, [filteredOutputs, selectedId]);

    useEffect(() => {
      if (!lastUpdated && status === 'idle') {
        refreshPrices();
      }
    }, [lastUpdated, status, refreshPrices]);

    const tree = buildProductionTree(selectedId, targetPerHour);
    if (!tree) return <div>Invalid Schematic Selection</div>;

    const rawReqs = getRawRequirements(tree);
    const outputPrice = priceLookup(selectedId);
    const outputValueHr = outputPrice ? targetPerHour * outputPrice.buyMax : undefined;
    const inputCostHr = Object.entries(rawReqs).reduce((acc, [id, qty]) => {
      const p = priceLookup(Number(id));
      if (!p) return acc;
      return acc + qty * p.sellMin;
    }, 0);
    const marginHr = outputValueHr !== undefined ? outputValueHr - inputCostHr : undefined;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <h2 className="text-xl font-bold text-white uppercase flex items-center gap-2">
                  <Package className="text-eve-accent-gold" />
                  Recursive Production Chain
              </h2>
              <div className="flex items-center gap-3 text-xs">
                <div className={cn("px-3 py-2 rounded border", stalePrices ? "border-eve-alert-red text-eve-alert-red" : "border-eve-border text-eve-text-muted")}>
                  {stalePrices ? "Prices stale" : "Prices fresh"} {lastUpdated ? `(${new Date(lastUpdated).toLocaleTimeString()})` : '(not loaded)'}
                </div>
                <button
                  onClick={() => refreshPrices()}
                  className="flex items-center gap-2 bg-eve-accent-blue/10 hover:bg-eve-accent-blue/20 text-eve-accent-blue border border-eve-accent-blue/50 px-3 py-2 rounded transition-all uppercase tracking-wider"
                >
                  <RefreshCw size={14} className={status === 'loading' ? 'animate-spin' : ''} />
                  Refresh Prices
                </button>
              </div>
            </div>

            {priceError && (
              <div className="mb-4 flex items-start gap-3 text-eve-alert-red bg-eve-panel/40 border border-eve-alert-red/40 px-4 py-3 rounded">
                <AlertTriangle size={18} />
                <div>
                  <div className="font-semibold">Price fetch failed</div>
                  <div className="text-sm text-eve-text-muted">{priceError}</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-eve-panel p-4 rounded border border-eve-border">
                    <h3 className="text-sm font-semibold text-eve-text-muted mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Gauge size={14} className="text-eve-accent-blue" /> Throughput Targets
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold">
                          {(['ALL','P0','P1','P2','P3','P4'] as const).map(t => (
                            <button
                              key={t}
                              onClick={() => setTierFilter(t)}
                              className={cn(
                                "px-2 py-1 rounded border border-eve-border/50 text-left",
                                tierFilter === t ? "bg-eve-accent-blue/20 text-white border-eve-accent-blue/50" : "bg-eve-dark-gray text-eve-text-muted"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>

                        <label className="text-xs text-eve-text-muted uppercase tracking-wider block">
                            Search
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type to filter materials"
                                className="mt-2 w-full bg-eve-dark-gray border border-eve-border text-white text-sm rounded px-3 py-2"
                            />
                        </label>

                        <label className="text-xs text-eve-text-muted uppercase tracking-wider block">
                            Output Material
                            <select
                                value={selectedId}
                                onChange={(e) => setSelectedId(Number(e.target.value))}
                                className="mt-2 w-full bg-eve-dark-gray border border-eve-border text-white text-sm rounded px-3 py-2"
                            >
                                {filteredOutputs.map(({ material }) => (
                                    <option key={material.id} value={material.id}>
                                        {material.name} ({material.tier})
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="text-xs text-eve-text-muted uppercase tracking-wider block">
                            Target Units per Hour
                            <input
                                type="number"
                                min={1}
                                value={targetPerHour}
                                onChange={(e) => setTargetPerHour(Math.max(1, Number(e.target.value)))}
                                className="mt-2 w-full bg-eve-dark-gray border border-eve-border text-white text-sm rounded px-3 py-2"
                            />
                        </label>

                        {schematic && (
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="bg-eve-dark-gray p-3 rounded border border-eve-border/50">
                                    <div className="text-eve-text-muted">Cycle</div>
                                    <div className="text-white font-mono">{schematic.cycleTime / 60} min</div>
                                    <div className="text-eve-text-muted">Per Cycle: {perCycle}</div>
                                </div>
                                <div className="bg-eve-dark-gray p-3 rounded border border-eve-border/50">
                                    <div className="text-eve-text-muted">Factories Needed</div>
                                    <div className="text-white font-mono">{factoriesNeeded}</div>
                                    <div className="text-eve-text-muted">{(cyclesPerHour * perCycle).toFixed(1)} units/hr per factory</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-eve-panel/30 p-4 rounded border border-eve-border">
                    <h3 className="text-sm font-semibold text-eve-text-muted mb-4 uppercase tracking-wider">Dependency Graph ({targetPerHour} Units/hr)</h3>
                    <div className="-ml-4">
                        <TreeNode node={tree} schematicByOutput={schematicByOutput} getPrice={priceLookup} stale={stalePrices} />
                    </div>
                </div>

                <div className="bg-eve-panel p-4 rounded border border-eve-border h-fit">
                    <h3 className="text-sm font-semibold text-eve-text-muted mb-4 uppercase tracking-wider">Logistics Summary</h3>
                    
                    <div className="space-y-4">
                        <div className="bg-eve-dark-gray p-3 rounded">
                            <span className="block text-xs text-eve-text-muted">Total Output Volume (per hour)</span>
                            <span className="text-lg font-mono text-white">{tree.totalVolume.toLocaleString()} m3</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div className="bg-eve-dark-gray p-3 rounded border border-eve-border/50">
                            <div className="text-eve-text-muted uppercase">Output Value/hr</div>
                            <div className="text-white font-mono text-sm">{outputValueHr !== undefined ? `${outputValueHr.toLocaleString()} ISK` : 'N/A'}</div>
                          </div>
                          <div className="bg-eve-dark-gray p-3 rounded border border-eve-border/50">
                            <div className="text-eve-text-muted uppercase">Input Cost/hr</div>
                            <div className="text-white font-mono text-sm">{Number.isFinite(inputCostHr) ? `${inputCostHr.toLocaleString()} ISK` : 'N/A'}</div>
                          </div>
                          <div className="bg-eve-dark-gray p-3 rounded border border-eve-border/50">
                            <div className="text-eve-text-muted uppercase">Margin/hr</div>
                            <div className={cn("font-mono text-sm", (marginHr ?? 0) >= 0 ? "text-eve-accent-blue" : "text-eve-alert-red")}>{marginHr !== undefined ? `${marginHr.toLocaleString()} ISK` : 'N/A'}</div>
                          </div>
                        </div>

                        <div>
                            <span className="block text-xs text-eve-text-muted mb-2">Raw Material Inputs (P0) per hour</span>
                            <div className="space-y-1">
                                {Object.entries(rawReqs).map(([id, qty]) => {
                                    const mat = MATERIALS[Number(id)];
                                    return (
                                        <div key={id} className="flex justify-between text-sm border-b border-eve-border/50 pb-1">
                                            <span className="text-gray-300">{mat?.name || id}</span>
                                            <span className="font-mono text-eve-accent-blue">{qty.toLocaleString()}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
