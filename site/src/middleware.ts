import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimit) {
    if (now > entry.resetTime) {
      rateLimit.delete(key);
    }
  }
}, 5 * 60 * 1000);

const BOOKING_LIMIT = { maxRequests: 5, windowMs: 60 * 60 * 1000 }; // 5 per hour
const LOGIN_LIMIT = { maxRequests: 5, windowMs: 15 * 60 * 1000 }; // 5 per 15 min

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rate limit booking submissions
  if (req.method === "POST" && pathname === "/api/booking") {
    const ip = getClientIp(req);
    const result = checkRateLimit(`booking:${ip}`, BOOKING_LIMIT.maxRequests, BOOKING_LIMIT.windowMs);

    if (!result.allowed) {
      return NextResponse.json(
        { error: "Too many booking requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // Rate limit admin login attempts
  if (req.method === "POST" && pathname === "/api/admin/login") {
    const ip = getClientIp(req);
    const result = checkRateLimit(`login:${ip}`, LOGIN_LIMIT.maxRequests, LOGIN_LIMIT.windowMs);

    if (!result.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/booking", "/api/admin/login"],
};
