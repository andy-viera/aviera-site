import { NextResponse, type NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

const BYPASS_KEY = "av2026";

export function middleware(request: NextRequest) {
  // Allow bypass with secret param: ?preview=av2026
  if (request.nextUrl.searchParams.get("preview") === BYPASS_KEY) {
    return NextResponse.next();
  }

  const { country } = geolocation(request);

  // On localhost/dev, country is undefined — allow
  if (!country) {
    return NextResponse.next();
  }

  // Only allow US traffic
  if (country !== "US") {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icon.svg).*)"],
};
