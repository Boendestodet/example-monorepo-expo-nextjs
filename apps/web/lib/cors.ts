export function corsHeaders(origin: string | null) {
  const allowOrigin = process.env.CORS_ALLOW_ORIGIN ?? "*";
  const o = allowOrigin === "*" ? "*" : (origin ?? allowOrigin);
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export function withCorsResponse(origin: string | null, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  const h = corsHeaders(origin);
  for (const [k, v] of Object.entries(h)) headers.set(k, v as string);
  return headers;
}
