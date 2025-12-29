import { Schematic, Material } from '../types/pi';

// A subset of data to prove the engine. 
// In a full app, this would be a large JSON imported or fetched from SDE.

export const MATERIALS: Record<number, Material> = {
  // P0 - Raw
  2073: { id: 2073, name: "Microorganisms", tier: "P0", volume: 0.01 },
  2268: { id: 2268, name: "Water", tier: "P0", volume: 0.01 },
  // P1 - Processed
  2390: { id: 2390, name: "Bacteria", tier: "P1", volume: 0.38 },
  2392: { id: 2392, name: "Water", tier: "P1", volume: 0.38 }, // Note: Game name collision handled by ID
  // P2 - Refined
  2312: { id: 2312, name: "Supertensile Plastics", tier: "P2", volume: 1.5 },
  // P3 - Specialized
  2349: { id: 2349, name: "Coolant", tier: "P2", volume: 1.5 }, 
  // ... Adding a few for the chain
};

export const SCHEMATICS: Record<number, Schematic> = {
  // P0 -> P1 (Basic Industry)
  // 3000 Units -> 20 Units per 30 mins (1800s)
  101: {
    id: 101,
    name: "Bacteria",
    cycleTime: 1800,
    inputs: [{ materialId: 2073, quantity: 3000 }],
    output: { materialId: 2390, quantity: 20 }
  },
  102: {
    id: 102,
    name: "Water",
    cycleTime: 1800,
    inputs: [{ materialId: 2268, quantity: 3000 }],
    output: { materialId: 2392, quantity: 20 }
  },
  // P1 -> P2 (Advanced Industry)
  // 40 + 40 -> 5 per 60 mins (3600s)
  103: {
    id: 103,
    name: "Test P2 Schematic", // Simplified for example
    cycleTime: 3600,
    inputs: [
        { materialId: 2390, quantity: 40 },
        { materialId: 2392, quantity: 40 }
    ],
    output: { materialId: 2312, quantity: 5 }
  }
};
