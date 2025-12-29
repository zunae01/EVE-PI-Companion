import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EveCharacter {
  CharacterID: number;
  CharacterName: string;
  ExpiresOn: string;
  Scopes: string;
  TokenType: string;
  CharacterOwnerHash: string;
  accessToken: string;
  refreshToken: string; // Needed to refresh the access token when it expires
}

interface AuthState {
  characters: Record<number, EveCharacter>;
  activeCharacterId: number | null;
  
  addCharacter: (char: EveCharacter) => void;
  removeCharacter: (charId: number) => void;
  setActiveCharacter: (charId: number) => void;
  updateToken: (charId: number, newToken: string, newExpiry: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      characters: {},
      activeCharacterId: null,

      addCharacter: (char) => set((state) => ({
        characters: { ...state.characters, [char.CharacterID]: char },
        activeCharacterId: state.activeCharacterId || char.CharacterID // Auto-select if first
      })),

      removeCharacter: (charId) => set((state) => {
        const newChars = { ...state.characters };
        delete newChars[charId];
        return { 
          characters: newChars,
          activeCharacterId: state.activeCharacterId === charId 
            ? Number(Object.keys(newChars)[0]) || null 
            : state.activeCharacterId 
        };
      }),

      setActiveCharacter: (charId) => set({ activeCharacterId: charId }),

      updateToken: (charId, newToken, newExpiry) => set((state) => ({
        characters: {
            ...state.characters,
            [charId]: {
                ...state.characters[charId],
                accessToken: newToken,
                ExpiresOn: newExpiry
            }
        }
      }))
    }),
    {
      name: 'eve-pi-auth-storage',
    }
  )
);
