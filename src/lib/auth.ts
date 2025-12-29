import { v4 as uuidv4 } from 'uuid';
import { useAuthStore, EveCharacter } from '../store/authStore';

// Public client configuration (client secret is kept server-side in Netlify function)
export const CLIENT_ID = import.meta.env.VITE_EVE_CLIENT_ID || '4d216fef040f44e49fe65dc5b0839b7d';
export const CALLBACK_URL = import.meta.env.VITE_EVE_CALLBACK_URL || window.location.origin + '/callback';
const AUTH_FUNCTION = '/.netlify/functions/esi-auth';
const SSO_URL = 'https://login.eveonline.com/v2/oauth/authorize';

// Scopes required for PI data
const SCOPES = [
  'esi-planets.manage_planets.v1',
  'esi-characters.read_planets.v1',
  'esi-skills.read_skills.v1',
  'esi-universe.read_structures.v1',
  'esi-search.search_structures.v1'
].join(' ');

/**
 * Generate a random string for the state parameter
 */
export function generateState() {
  return uuidv4();
}

/**
 * Generate a random string for the code verifier (PKCE)
 */
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).slice(-2)).join('');
}

/**
 * Hash the code verifier to create the code challenge (PKCE)
 */
async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  
  // Convert buffer to base64url string
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Initiates the SSO flow by redirecting the user
 */
export async function login() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  sessionStorage.setItem('pkce_state', state);
  sessionStorage.setItem('pkce_code_verifier', codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri: CALLBACK_URL,
    client_id: CLIENT_ID,
    scope: SCOPES,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });

  window.location.href = `${SSO_URL}?${params.toString()}`;
}

type AuthFunctionResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  character: {
    id: number;
    name: string;
    owner: string;
    scopes: string[];
  }
};

async function callAuthFunction(payload: Record<string, string>) {
  const res = await fetch(AUTH_FUNCTION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Authentication failed');
  }

  return res.json() as Promise<AuthFunctionResponse>;
}

function normalizeCharacter(data: AuthFunctionResponse): EveCharacter {
  return {
    CharacterID: data.character.id,
    CharacterName: data.character.name,
    CharacterOwnerHash: data.character.owner,
    Scopes: data.character.scopes,
    TokenType: data.tokenType,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    ExpiresOn: new Date(Date.now() + data.expiresIn * 1000).toISOString()
  };
}

/**
 * Exchanges the authorization code for an access token
 */
export async function handleCallback(urlParams: URLSearchParams) {
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  
  const storedState = sessionStorage.getItem('pkce_state');
  const codeVerifier = sessionStorage.getItem('pkce_code_verifier');

  if (!code || !state || state !== storedState || !codeVerifier) {
    throw new Error('Invalid state or missing code parameters');
  }

  const data = await callAuthFunction({
    grant_type: 'authorization_code',
    code,
    code_verifier: codeVerifier,
    redirect_uri: CALLBACK_URL
  });

  sessionStorage.removeItem('pkce_state');
  sessionStorage.removeItem('pkce_code_verifier');

  return normalizeCharacter(data);
}

/**
 * Refresh access token via Netlify function
 */
export async function refreshAccessToken(refreshToken: string) {
  const data = await callAuthFunction({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });
  return normalizeCharacter(data);
}

/**
 * Ensures a valid token for the character, refreshing if needed.
 */
export async function getValidAccessToken(characterId: number) {
  const store = useAuthStore.getState();
  const char = store.characters[characterId];
  if (!char) throw new Error('Character not found');

  const expiresAt = new Date(char.ExpiresOn).getTime();
  const bufferMs = 60_000; // refresh 1 minute early

  if (Date.now() < expiresAt - bufferMs) {
    return char.accessToken;
  }

  const refreshed = await refreshAccessToken(char.refreshToken);
  store.updateTokens(characterId, { 
    accessToken: refreshed.accessToken, 
    refreshToken: refreshed.refreshToken, 
    expiresOn: refreshed.ExpiresOn 
  });
  return refreshed.accessToken;
}
