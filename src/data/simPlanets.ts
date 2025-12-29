import { Planet } from '../types/pi';

// Mocked planets for simulation mode; adjust as needed.
export const SIM_PLANETS: Planet[] = [
  {
    id: 900001,
    characterId: 0,
    name: 'Helios Prime',
    type: 'Temperate',
    radius: 6000,
    systemId: 30000142,
    upgradeLevel: 5,
    lastUpdate: new Date().toISOString(),
    numPins: 28,
    numLinks: 24,
    numRoutes: 42,
    throughputPerHour: 1200,
    outputMaterialId: 2312, // Supertensile Plastics
    pocoTax: 8
  },
  {
    id: 900002,
    characterId: 0,
    name: 'Vortex Extractor',
    type: 'Storm',
    radius: 8000,
    systemId: 30002053,
    upgradeLevel: 4,
    lastUpdate: new Date().toISOString(),
    numPins: 18,
    numLinks: 15,
    numRoutes: 22,
    throughputPerHour: 950, // Reactive Gas -> Oxygen? (placeholder)
    outputMaterialId: 2392, // Oxidizing Compound (P1)
    pocoTax: 10
  },
  {
    id: 900003,
    characterId: 0,
    name: 'Inferno Forge',
    type: 'Lava',
    radius: 9500,
    systemId: 30001470,
    upgradeLevel: 5,
    lastUpdate: new Date().toISOString(),
    numPins: 24,
    numLinks: 21,
    numRoutes: 35,
    throughputPerHour: 1100,
    outputMaterialId: 2349, // Coolant (P2)
    pocoTax: 12
  },
  {
    id: 900004,
    characterId: 0,
    name: 'Nebula Chemworks',
    type: 'Gas',
    radius: 7000,
    systemId: 30003318,
    upgradeLevel: 3,
    lastUpdate: new Date().toISOString(),
    numPins: 14,
    numLinks: 12,
    numRoutes: 18,
    throughputPerHour: 640,
    outputMaterialId: 9838, // Superconductors (P3)
    pocoTax: 9
  }
];
