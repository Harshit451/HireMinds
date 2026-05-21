// JWT implementation
// Demonstrates: JWT token authentication

interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

const SECRET = 'hireminds-secret-key-2024';

function base64Encode(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => 
    String.fromCharCode(parseInt(p1, 16))
  ));
}

function base64Decode(str: string): string {
  return decodeURIComponent(atob(str).split('').map(c => 
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));
}

export function jwtSign(payload: Omit<JWTPayload, 'iat' | 'exp'>, expiresIn: number = 86400): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn
  };

  const headerB64 = base64Encode(JSON.stringify(header));
  const payloadB64 = base64Encode(JSON.stringify(fullPayload));
  const signature = base64Encode(`${headerB64}.${payloadB64}.${SECRET}`);

  return `${headerB64}.${payloadB64}.${signature}`;
}

export function jwtVerify(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signature] = parts;
    const expectedSig = base64Encode(`${headerB64}.${payloadB64}.${SECRET}`);
    
    if (signature !== expectedSig) return null;

    const payload: JWTPayload = JSON.parse(base64Decode(payloadB64));
    
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

export function jwtDecode(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(base64Decode(parts[1]));
  } catch {
    return null;
  }
}
