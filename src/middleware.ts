import { NextResponse, type NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

const BYPASS_KEY = "av2026";

export function middleware(request: NextRequest) {
  // Allow bypass via query param — set cookie for subsequent requests
  if (request.nextUrl.searchParams.get("preview") === BYPASS_KEY) {
    const response = NextResponse.next();
    response.cookies.set("preview_bypass", "1", { maxAge: 86400 }); // 24 hours
    return response;
  }

  // Allow if bypass cookie exists
  if (request.cookies.get("preview_bypass")?.value === "1") {
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
