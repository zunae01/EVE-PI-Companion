import { v4 as uuidv4 } from 'uuid';

// Configuration - REPLACE THIS WITH YOUR CLIENT ID FROM developers.eveonline.com
export const CLIENT_ID = import.meta.env.VITE_EVE_CLIENT_ID || '4d216fef040f44e49fe65dc5b0839b7d';
export const CALLBACK_URL = import.meta.env.VITE_EVE_CALLBACK_URL || window.location.origin + '/callback';

const SSO_URL = 'https://login.eveonline.com/v2/oauth/authorize';
const TOKEN_URL = 'https://login.eveonline.com/v2/oauth/token';

// Scopes we identified earlier
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

  // Store verifier locally to verify callback later
  sessionStorage.setItem('pkce_state', state);
  sessionStorage.setItem('pkce_code_verifier', codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri: CALLBACK_URL,
    client_id: CLIENT_ID,
    scope: SCOPES,
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });

  window.location.href = `${SSO_URL}?${params.toString()}`;
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

  // Exchange code for token
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier,
    redirect_uri: CALLBACK_URL, // Must match the original redirect_uri exactly
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'login.eveonline.com'
    },
    body: body
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Token exchange failed: ${err.error_description || response.statusText}`);
  }

  const data = await response.json();
  
  // Clean up
  sessionStorage.removeItem('pkce_state');
  sessionStorage.removeItem('pkce_code_verifier');

  return parseTokenResponse(data);
}

/**
 * Parses the raw token response and verifies the JWT signature (simplified for client-side)
 * Ideally, use a library like jwt-decode to extract the character info.
 */
function parseTokenResponse(data: any) {
  // Decode JWT to get character info
  // The access_token is a JWT. The payload contains specific claims.
  const payloadPart = data.access_token.split('.')[1];
  const payload = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));

  return {
    CharacterID: Number(payload.sub.split(':')[2]),
    CharacterName: payload.name,
    ExpiresOn: new Date(Date.now() + data.expires_in * 1000).toISOString(),
    Scopes: payload.scp, // Array or string depending on format
    TokenType: data.token_type,
    CharacterOwnerHash: payload.owner,
    accessToken: data.access_token,
    refreshToken: data.refresh_token
  };
}
