import type { Handler } from '@netlify/functions';

const TOKEN_URL = 'https://login.eveonline.com/v2/oauth/token';

type TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
};

function decodeJwt(token: string) {
  const payload = token.split('.')[1];
  const decoded = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
  return JSON.parse(decoded);
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const clientId = process.env.EVE_CLIENT_ID;
  const clientSecret = process.env.EVE_CLIENT_SECRET;
  const callbackUrl = process.env.EVE_CALLBACK_URL;

  if (!clientId || !clientSecret || !callbackUrl) {
    return { statusCode: 500, body: 'EVE SSO env vars missing' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const grantType = body.grant_type;

    const params = new URLSearchParams();
    params.append('grant_type', grantType);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    if (grantType === 'authorization_code') {
      params.append('code', body.code);
      params.append('redirect_uri', callbackUrl);
      if (body.code_verifier) params.append('code_verifier', body.code_verifier);
    } else if (grantType === 'refresh_token') {
      params.append('refresh_token', body.refresh_token);
    } else {
      return { statusCode: 400, body: 'Invalid grant_type' };
    }

    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      return { statusCode: tokenRes.status, body: errorText };
    }

    const tokenData: TokenResponse = await tokenRes.json();
    const payload = decodeJwt(tokenData.access_token);
    const characterId = Number(String(payload.sub).split(':')[2]);

    const responseBody = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      tokenType: tokenData.token_type,
      character: {
        id: characterId,
        name: payload.name,
        owner: payload.owner,
        scopes: Array.isArray(payload.scp) ? payload.scp : String(payload.scp || '').split(' ').filter(Boolean)
      }
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(responseBody)
    };
  } catch (err: any) {
    return { statusCode: 500, body: err?.message || 'Unknown error' };
  }
};
