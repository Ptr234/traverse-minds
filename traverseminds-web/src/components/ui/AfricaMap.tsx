"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

interface CountryData {
  name: string;
  data: string;
}

interface AfricaMapProps {
  countries?: CountryData[];
  className?: string;
}

const DEFAULT_COUNTRIES: CountryData[] = [
  { name: "Uganda", data: "HQ — Kampala" },
  { name: "Kenya", data: "Nairobi Office" },
  { name: "Tanzania", data: "Dar es Salaam" },
  { name: "Rwanda", data: "Kigali Hub" },
  { name: "Burundi", data: "Bujumbura" },
];

const COUNTRY_COORDS: Record<string, [number, number]> = {
  Uganda: [1.3733, 32.2903],
  Kenya: [-0.0236, 37.9062],
  Tanzania: [-6.369, 34.8888],
  Rwanda: [-1.9403, 29.8739],
  Burundi: [-3.3731, 29.9189],
};

function MapInner({
  countries = DEFAULT_COUNTRIES,
  className,
}: AfricaMapProps) {
  /* ---------- leaflet imports (client-only) ---------- */
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require("leaflet") as typeof import("leaflet");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { MapContainer, TileLayer, CircleMarker, Tooltip } = require("react-leaflet");

  /* Fix default icon paths for webpack bundling */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  return (
    <>
      {/* Leaflet CSS */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />

      <div
        className={cn(
          "relative h-100 w-full overflow-hidden rounded-2xl border border-border-light",
          className,
        )}
      >
        <MapContainer
          center={[-1.5, 32]}
          zoom={5}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
          style={{ height: "100%", width: "100%", borderRadius: "inherit" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {countries.map((country) => {
            const coords = COUNTRY_COORDS[country.name];
            if (!coords) return null;

            return (
              <CircleMarker
                key={country.name}
                center={coords}
                radius={10}
                pathOptions={{
                  color: "#F97316",
                  fillColor: "#F97316",
                  fillOpacity: 0.25,
                  weight: 2,
                }}
                eventHandlers={{
                  mouseover: (e: L.LeafletMouseEvent) => {
                    const marker = e.target as L.CircleMarker;
                    marker.setStyle({
                      fillOpacity: 0.6,
                      weight: 3,
                      radius: 14,
                    });
                    marker.openTooltip();
                  },
                  mouseout: (e: L.LeafletMouseEvent) => {
                    const marker = e.target as L.CircleMarker;
                    marker.setStyle({
                      fillOpacity: 0.25,
                      weight: 2,
                      radius: 10,
                    });
                    marker.closeTooltip();
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <div className="text-center">
                    <p className="font-bold text-sm text-primary">
                      {country.name}
                    </p>
                    <p className="text-xs text-brand-medium">{country.data}</p>
                  </div>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}

/**
 * African Leaflet Map — interactive map of Africa countries.
 * Dynamically imported with SSR disabled to avoid window/document errors.
 */
const AfricaMap = dynamic(
  () => Promise.resolve(MapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-100 w-full items-center justify-center rounded-2xl border border-border-light bg-surface-elevated">
        <div className="flex flex-col items-center gap-2 text-brand-medium">
          <svg
            className="h-8 w-8 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-sm">Loading map&hellip;</span>
        </div>
      </div>
    ),
  },
);

export { AfricaMap };
export type { AfricaMapProps, CountryData };
