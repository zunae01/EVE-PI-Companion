import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Planet, Pin, Link, PinType } from '../types/pi';
import { PIN_COSTS, getPlanetCapacity } from '../lib/math';
import { SIM_PLANETS } from '../data/simPlanets';

interface EmpireState {
  planets: Record<number, Planet>;
  pins: Record<string, Pin>;
  links: Record<string, Link>;
  mode: 'live' | 'simulation';
  simPlanets: Record<number, Planet>;
  simSettings: {
    skills: {
      interplanetaryConsolidation: number;
      commandCenterUpgrades: number;
      planetology: number;
    };
    taxes: {
      poco: number; // %
      export: number; // %
      broker: number; // %
    };
  };
  setPlanets: (planets: Planet[]) => void;
  setSimPlanets: (planets: Planet[]) => void;
  setMode: (mode: 'live' | 'simulation') => void;
  updateSimSkills: (skills: Partial<EmpireState['simSettings']['skills']>) => void;
  updateSimTaxes: (taxes: Partial<EmpireState['simSettings']['taxes']>) => void;
  updateSimPlanet: (planetId: number, patch: Partial<Planet>) => void;
  clear: () => void;
  
  // Actions
  addPlanet: (planet: Planet) => void;
  removePlanet: (planetId: number) => void;
  addPin: (planetId: number, type: PinType, x: number, y: number) => void;
  removePin: (pinId: string) => void;
  
  // Computed (simplified for now, ideally derived or memoized selectors)
  getPlanetStats: (planetId: number) => { cpuUsed: number; pgUsed: number; cpuMax: number; pgMax: number };
}

export const useEmpireStore = create<EmpireState>()(
  persist(
    (set, get) => ({
      planets: {},
      pins: {},
      links: {},
      mode: 'live',
      simPlanets: SIM_PLANETS.reduce((acc, p) => { acc[p.id] = p; return acc; }, {} as Record<number, Planet>),
      simSettings: {
        skills: {
          interplanetaryConsolidation: 5,
          commandCenterUpgrades: 5,
          planetology: 4
        },
        taxes: {
          poco: 10,
          export: 5,
          broker: 3
        }
      },
      setPlanets: (planets) => set(() => ({
        planets: planets.reduce((acc, p) => {
          acc[p.id] = p;
          return acc;
        }, {} as Record<number, Planet>)
      })),
      setSimPlanets: (planets) => set(() => ({
        simPlanets: planets.reduce((acc, p) => {
          acc[p.id] = p;
          return acc;
        }, {} as Record<number, Planet>)
      })),
      setMode: (mode) => set({ mode }),
      updateSimSkills: (skills) => set((state) => ({
        simSettings: {
          ...state.simSettings,
          skills: { ...state.simSettings.skills, ...skills }
        }
      })),
      updateSimTaxes: (taxes) => set((state) => ({
        simSettings: {
          ...state.simSettings,
          taxes: { ...state.simSettings.taxes, ...taxes }
        }
      })),
      updateSimPlanet: (planetId, patch) => set((state) => {
        const existing = state.simPlanets[planetId];
        if (!existing) return {};
        return {
          simPlanets: {
            ...state.simPlanets,
            [planetId]: { ...existing, ...patch }
          }
        };
      }),
      clear: () => set(() => ({ planets: {}, pins: {}, links: {} })),

      addPlanet: (planet) => set((state) => ({
        planets: { ...state.planets, [planet.id]: planet }
      })),

      removePlanet: (planetId) => set((state) => {
        const newPlanets = { ...state.planets };
        delete newPlanets[planetId];
        // logic to remove associated pins/links would go here
        return { planets: newPlanets };
      }),

      addPin: (planetId, type, x, y) => set((state) => {
        const id = uuidv4();
        const newPin: Pin = {
          id,
          planetId,
          type,
          x,
          y,
          contents: {}
        };
        return { pins: { ...state.pins, [id]: newPin } };
      }),

      removePin: (pinId) => set((state) => {
        const newPins = { ...state.pins };
        delete newPins[pinId];
        return { pins: newPins };
      }),

      getPlanetStats: (planetId) => {
        const state = get();
        const planet = state.planets[planetId];
        if (!planet) return { cpuUsed: 0, pgUsed: 0, cpuMax: 0, pgMax: 0 };

        const capacity = getPlanetCapacity(planet.upgradeLevel);
        
        let cpuUsed = 0;
        let pgUsed = 0;

        // Sum Pins
        Object.values(state.pins)
          .filter(p => p.planetId === planetId)
          .forEach(p => {
            const cost = PIN_COSTS[p.type] || { cpu: 0, pg: 0 };
            cpuUsed += cost.cpu;
            pgUsed += cost.pg;
          });

        // Sum Links (TODO: implement link calculation logic based on actual links)
        
        return {
          cpuUsed,
          pgUsed,
          cpuMax: capacity.cpu,
          pgMax: capacity.pg
        };
      }
    }),
    {
      name: 'eve-pi-empire-storage', // key in localStorage
    }
  )
);
