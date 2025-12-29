export type PlanetType = 'Barren' | 'Gas' | 'Ice' | 'Lava' | 'Oceanic' | 'Plasma' | 'Storm' | 'Temperate';

export type MaterialTier = 'R0' | 'P0' | 'P1' | 'P2' | 'P3' | 'P4';

export interface Material {
  id: number;
  name: string;
  tier: MaterialTier;
  volume: number;
}

export interface Schematic {
  id: number;
  name: string;
  cycleTime: number; // Seconds
  inputs: { materialId: number; quantity: number }[];
  output: { materialId: number; quantity: number };
}

export interface Planet {
  id: number;
  name: string;
  type: PlanetType;
  radius: number; // km, affects link costs
  systemId: number;
  upgradeLevel: number; // Command Center level (0-5)
  characterId: number;
  lastUpdate: string;
  numPins?: number;
  numLinks?: number;
  numRoutes?: number;
}

export type PinType = 'Command Center' | 'Extractor Control Unit' | 'Basic Industry' | 'Advanced Industry' | 'High Tech Production' | 'Launchpad' | 'Storage Facility';

export interface Pin {
  id: string; // UUID
  planetId: number;
  type: PinType;
  x: number; // Normalised coordinate (0-1) or Game coordinate? Game uses spherical, we might project to 2D for UI.
  y: number;
  schematicId?: number; // If factory
  lastCycleStart?: number; // Timestamp
  contents: Record<number, number>; // MaterialID -> Quantity
}

export interface Link {
  id: string;
  sourcePinId: string;
  targetPinId: string;
  level: number; // 0-10, affects capacity
}
