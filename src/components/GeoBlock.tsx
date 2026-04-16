"use client";

import { useEffect, useState } from "react";

export default function GeoBlock({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    // Geo-block temporarily disabled for development
    // TODO: Re-enable before sharing with UY contacts
    setAllowed(true);
  }, []);

  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05050a]">
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      </div>
    );
  }

  if (!allowed) {
    return <div style={{ minHeight: "100vh", background: "#000" }} />;
  }

  return <>{children}</>;
}
