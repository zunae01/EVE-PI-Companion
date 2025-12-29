import React, { useState } from 'react';
import { MATERIALS } from '../data/schematics';
import { buildProductionTree, ProductionNode, getRawRequirements } from '../lib/chain';
import { ChevronRight, ChevronDown, Package, Box } from 'lucide-react';
import { cn } from '../components/PlanetCard'; // Reusing utility

const TreeNode: React.FC<{ node: ProductionNode; depth?: number }> = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div className="ml-4 border-l border-eve-border pl-4 relative">
        {/* Connection Line */}
        <div className="absolute -left-[1px] top-3 w-4 h-px bg-eve-border" />
        
        <div className="flex items-center gap-2 py-1">
            {hasChildren && (
                <button onClick={() => setExpanded(!expanded)} className="text-eve-text-muted hover:text-white">
                    {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
            )}
            {!hasChildren && <div className="w-[14px]" />} {/* Spacer */}

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
                    {node.totalVolume.toLocaleString(undefined, { maximumFractionDigits: 1 })} m³
                </span>
            </div>
        </div>

        {expanded && node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
        ))}
    </div>
  );
};

export const SchematicAnalyzer: React.FC = () => {
    // Default to a known schematic output for demo (e.g., Supertensile Plastics P2)
    const [selectedId] = useState<number>(2312); 
    const tree = buildProductionTree(selectedId, 100); // Analyze 100 units
    
    if (!tree) return <div>Invalid Schematic Selection</div>;

    const rawReqs = getRawRequirements(tree);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                <Package className="text-eve-accent-gold" />
                Recursive Production Chain
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-eve-panel/30 p-4 rounded border border-eve-border">
                    <h3 className="text-sm font-semibold text-eve-text-muted mb-4 uppercase tracking-wider">Dependency Graph (100 Units)</h3>
                    <div className="-ml-4">
                        <TreeNode node={tree} />
                    </div>
                </div>

                <div className="bg-eve-panel p-4 rounded border border-eve-border h-fit">
                    <h3 className="text-sm font-semibold text-eve-text-muted mb-4 uppercase tracking-wider">Logistics Summary</h3>
                    
                    <div className="space-y-4">
                        <div className="bg-eve-dark-gray p-3 rounded">
                            <span className="block text-xs text-eve-text-muted">Total Output Volume</span>
                            <span className="text-lg font-mono text-white">{tree.totalVolume.toLocaleString()} m³</span>
                        </div>

                        <div>
                            <span className="block text-xs text-eve-text-muted mb-2">Raw Material Inputs (P0)</span>
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
