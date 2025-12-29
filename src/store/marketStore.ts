import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MATERIALS } from '../data/schematics';

type PriceEntry = {
  buyMax: number;   // use for outputs
  sellMin: number;  // use for inputs
  lastUpdated: number;
};

interface MarketState {
  prices: Record<number, PriceEntry>;
  lastUpdated: number | null;
  status: 'idle' | 'loading' | 'error' | 'stale' | 'ready';
  error?: string;
  refreshPrices: () => Promise<void>;
  getPrice: (id: number) => PriceEntry | undefined;
}

const REGION_ID = 10000002; // Jita
const STALE_MS = 1000 * 60 * 60; // 1 hour

async function fetchPrices(): Promise<Record<number, PriceEntry>> {
  const typeIds = Object.keys(MATERIALS).map(Number);
  const url = `https://market.fuzzwork.co.uk/aggregates/?region=${REGION_ID}&types=${typeIds.join(',')}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Price fetch failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const now = Date.now();
  const prices: Record<number, PriceEntry> = {};
  Object.entries(json as Record<string, any>).forEach(([idStr, entry]) => {
    const id = Number(idStr);
    const buyMax = entry?.buy?.max ?? 0;
    const sellMin = entry?.sell?.min ?? 0;
    prices[id] = { buyMax, sellMin, lastUpdated: now };
  });
  return prices;
}

export const useMarketStore = create<MarketState>()(
  persist(
    (set, get) => ({
      prices: {},
      lastUpdated: null,
      status: 'idle',
      error: undefined,
      getPrice: (id) => get().prices[id],
      refreshPrices: async () => {
        set({ status: 'loading', error: undefined });
        try {
          const prices = await fetchPrices();
          const lastUpdated = Date.now();
          set({ prices, lastUpdated, status: 'ready' });
        } catch (err: any) {
          set({ status: 'error', error: err?.message || 'Price fetch failed' });
        }
      }
    }),
    {
      name: 'eve-pi-market-cache'
    }
  )
);

export function isStale(lastUpdated: number | null) {
  if (!lastUpdated) return true;
  return Date.now() - lastUpdated > STALE_MS;
}
