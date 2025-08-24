import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.AUTH_JWT_SECRET || "dev-secret-change-me");
const cookieName = "auth_token";

export type AppJwt = JWTPayload & {
  uid: number;
  email: string;
  name?: string | null;
};

export function getExpirySeconds() {
  const days = Number(process.env.TOKEN_EXPIRES_IN_DAYS || "7");
  return days * 24 * 60 * 60;
}

export async function signToken(payload: AppJwt) {
  const exp = Math.floor(Date.now() / 1000) + getExpirySeconds();
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime(exp).setIssuedAt().sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify<AppJwt>(token, secret);
  return payload;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get(cookieName)?.value;
  if (cookie) return cookie;
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const [type, value] = auth.split(" ");
  if (type?.toLowerCase() !== "bearer" || !value) return null;
  return value;
}
