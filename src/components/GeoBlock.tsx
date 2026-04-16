"use client";

export default function GeoBlock({ children }: { children: React.ReactNode }) {
  // Geo blocking is now handled by Edge Middleware (src/middleware.ts)
  // This component is kept as a passthrough for backwards compatibility
  return <>{children}</>;
}
