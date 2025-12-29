import { getValidAccessToken } from './auth';
import { Planet, PlanetType } from '../types/pi';

const ESI_BASE = 'https://esi.evetech.net/latest';

const planetTypeMap: Record<string, PlanetType> = {
  barren: 'Barren',
  gas: 'Gas',
  ice: 'Ice',
  lava: 'Lava',
  oceanic: 'Oceanic',
  plasma: 'Plasma',
  storm: 'Storm',
  temperate: 'Temperate'
};

function mapPlanetType(raw: string): PlanetType {
  return planetTypeMap[raw as keyof typeof planetTypeMap] ?? 'Temperate';
}

async function esiGet<T>(path: string, accessToken: string): Promise<T> {
  const url = `${ESI_BASE}${path}${path.includes('?') ? '&' : '?'}datasource=tranquility`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ESI error ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}

async function fetchPlanetNames(ids: number[]): Promise<Record<number, string>> {
  if (ids.length === 0) return {};

  const res = await fetch(`${ESI_BASE}/universe/names/?datasource=tranquility`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ids)
  });

  if (!res.ok) {
    // Non-fatal: we can still render with fallback names
    return {};
  }

  const data: { id: number; category: string; name: string }[] = await res.json();
  return data
    .filter((d) => d.category === 'planet')
    .reduce((acc, d) => {
      acc[d.id] = d.name;
      return acc;
    }, {} as Record<number, string>);
}

export async function fetchCharacterPlanets(characterId: number): Promise<Planet[]> {
  const accessToken = await getValidAccessToken(characterId);
  // High-level list
  const list = await esiGet<any[]>(`/characters/${characterId}/planets/`, accessToken);
  const planetIds = list.map((p) => p.planet_id);
  const nameMap = await fetchPlanetNames(planetIds);

  // Fetch per-planet detail to surface link counts and radius if available
  const details = await Promise.all(
    list.map(async (p) => {
      try {
        const detail = await esiGet<any>(`/characters/${characterId}/planets/${p.planet_id}/`, accessToken);
        return detail;
      } catch (err) {
        // If detail fails, keep going with list data
        console.warn('Failed to fetch planet detail', p.planet_id, err);
        return null;
      }
    })
  );

  const planets: Planet[] = list.map((p, idx) => {
    const detail = details[idx];
    return {
      id: p.planet_id,
      name: nameMap[p.planet_id] || `Planet ${p.planet_id}`,
      type: mapPlanetType(p.planet_type),
      radius: detail?.radius || 0,
      systemId: p.solar_system_id,
      upgradeLevel: p.upgrade_level,
      characterId,
      lastUpdate: p.last_update,
      numPins: p.num_pins,
      numLinks: p.num_links,
      numRoutes: p.num_routes
    };
  });

  return planets;
}
