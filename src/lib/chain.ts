import { SCHEMATICS, MATERIALS } from '../data/schematics';
import { Material, Schematic } from '../types/pi';

export interface ProductionNode {
  material: Material;
  quantity: number;
  schematic?: Schematic;
  children: ProductionNode[];
  totalVolume: number; // m3 for this specific stack
}

/**
 * Recursively builds a production tree for a given material ID
 */
export function buildProductionTree(materialId: number, targetQuantity: number = 1): ProductionNode | null {
  const material = MATERIALS[materialId];
  if (!material) return null;

  const node: ProductionNode = {
    material,
    quantity: targetQuantity,
    children: [],
    totalVolume: targetQuantity * material.volume
  };

  // Find a schematic that produces this material
  const schematic = Object.values(SCHEMATICS).find(s => s.output.materialId === materialId);
  
  if (schematic) {
    node.schematic = schematic;
    
    // Calculate how many runs we need
    // Note: This is a simplification. Real PI runs in cycles. 
    // We need 'targetQuantity' units. Schematic produces 'output.quantity' per run.
    const runs = targetQuantity / schematic.output.quantity;
    
    // For each input, recurse
    schematic.inputs.forEach(input => {
      const inputQty = input.quantity * runs;
      const childNode = buildProductionTree(input.materialId, inputQty);
      if (childNode) {
        node.children.push(childNode);
      }
    });
  }

  return node;
}

/**
 * Flattens the tree to get total raw material requirements (P0)
 */
export function getRawRequirements(node: ProductionNode): Record<number, number> {
  let totals: Record<number, number> = {};

  if (node.children.length === 0) {
    // Leaf node (usually P0 or R0, or something we don't have a schematic for)
    totals[node.material.id] = (totals[node.material.id] || 0) + node.quantity;
  } else {
    node.children.forEach(child => {
      const childTotals = getRawRequirements(child);
      Object.entries(childTotals).forEach(([id, qty]) => {
        totals[Number(id)] = (totals[Number(id)] || 0) + qty;
      });
    });
  }

  return totals;
}
