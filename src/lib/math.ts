/**
 * Core mathematical functions for EVE Planetary Industry
 */

// CPU/PG baselines
export const CC_UPGRADES = {
  0: { cpu: 1675, pg: 6000 },
  1: { cpu: 7057, pg: 9000 },
  2: { cpu: 12136, pg: 12000 },
  3: { cpu: 17215, pg: 15000 },
  4: { cpu: 22294, pg: 19000 },
  5: { cpu: 27373, pg: 25000 },
};

export const PIN_COSTS = {
  'Command Center': { cpu: 0, pg: 0 },
  'Extractor Control Unit': { cpu: 110, pg: 2600 },
  'Basic Industry': { cpu: 200, pg: 800 },
  'Advanced Industry': { cpu: 500, pg: 700 },
  'High Tech Production': { cpu: 1100, pg: 400 },
  'Launchpad': { cpu: 3600, pg: 700 },
  'Storage Facility': { cpu: 500, pg: 700 },
};

/**
 * Calculates the Powergrid usage of a link.
 * Formula roughly: (Link Length / Planet Radius) * Factor?
 * Actual EVE Formula:
 * CPU: 0.2 * length_km
 * PG: length_km * (some factor depending on planet type/radius)
 * 
 * Simplified approximation for prototype:
 * PG = (Distance / 1000) * 1.5 + Base
 */
export function calculateLinkUsage(distanceKm: number, level: number = 0) {
  // Base usage increases with length
  // Upgrading link (level) increases throughput but also CPU/PG cost? 
  // Actually, upgrading link simply increases capacity, cost is static per length.
  
  const cpu = Math.ceil(0.15 * distanceKm); 
  const pg = Math.ceil(0.2 * distanceKm);
  
  return { cpu, pg };
}

/**
 * Returns the max CPU/PG for a given command center level + skills
 */
export function getPlanetCapacity(ccLevel: number, skillLevel: number = 0) {
  // The skill "Command Center Upgrades" boosts CPU/PG of the command center
  // Actually, the skill just allows you to upgrade the CC.
  // The levels 0-5 ARE the upgrade levels.
  // Skill: Command Center Upgrades checks if you CAN upgrade to level X.
  
  return CC_UPGRADES[ccLevel as keyof typeof CC_UPGRADES] || CC_UPGRADES[0];
}

/**
 * Calculates theoretical max hourly output
 */
export function calculateHourlyYield(schematicId: number, numFactories: number) {
    // Implementation needed
    return 0;
}
