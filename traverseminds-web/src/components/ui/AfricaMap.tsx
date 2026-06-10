"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

interface CountryData {
  name: string;
  data: string;
  status?: "active" | "pipeline";
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
  { name: "Nigeria", data: "West Africa Hub" },
  { name: "South Africa", data: "Southern Africa Hub" },
  { name: "Egypt", data: "North Africa Hub" },
  { name: "Senegal", data: "Dakar Office" },
  { name: "Ethiopia", data: "Addis Ababa Hub" },
];

const COUNTRY_COORDS: Record<string, [number, number]> = {
  Uganda: [1.3733, 32.2903],
  Kenya: [-0.0236, 37.9062],
  Tanzania: [-6.369, 34.8888],
  Rwanda: [-1.9403, 29.8739],
  Burundi: [-3.3731, 29.9189],
  Nigeria: [9.0820, 8.6753],
  "South Africa": [-30.5595, 22.9375],
  Egypt: [26.8206, 30.8025],
  Senegal: [14.4974, -14.4524],
  Ethiopia: [9.1450, 40.4897],
  Ghana: [7.9465, -1.0232],
  "Ivory Coast": [7.5400, -5.5471],
  Zambia: [-13.1339, 27.8493],
  Botswana: [-22.3285, 24.6849],
  Namibia: [-22.9576, 18.4904],
  DRC: [-4.0383, 21.7587],
  Cameroon: [3.8480, 11.5021],
  Gabon: [-0.8037, 11.6094],
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
          center={[2.0, 16.0]}
          zoom={3}
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

            const isPipeline = country.status === "pipeline";
            const baseColor = isPipeline ? "#919499" : "#ff4c00";
            const hoverColor = isPipeline ? "#515459" : "#ff4c00";

            return (
              <CircleMarker
                key={country.name}
                center={coords}
                radius={isPipeline ? 7 : 10}
                pathOptions={{
                  color: baseColor,
                  fillColor: baseColor,
                  fillOpacity: isPipeline ? 0.2 : 0.3,
                  weight: 2,
                }}
                eventHandlers={{
                  mouseover: (e: L.LeafletMouseEvent) => {
                    const marker = e.target as L.CircleMarker;
                    marker.setStyle({
                      color: hoverColor,
                      fillColor: hoverColor,
                      fillOpacity: isPipeline ? 0.45 : 0.65,
                      weight: 3,
                    });
                    marker.openTooltip();
                  },
                  mouseout: (e: L.LeafletMouseEvent) => {
                    const marker = e.target as L.CircleMarker;
                    marker.setStyle({
                      color: baseColor,
                      fillColor: baseColor,
                      fillOpacity: isPipeline ? 0.2 : 0.3,
                      weight: 2,
                    });
                    marker.closeTooltip();
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.97}>
                  <div className="text-center" style={{ minWidth: 110 }}>
                    <p className="font-bold text-sm" style={{ color: isPipeline ? "#515459" : "#ff4c00" }}>
                      {country.name}
                    </p>
                    <p className="text-xs" style={{ color: "#515459" }}>{country.data}</p>
                    {isPipeline && (
                      <p className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: "#919499" }}>Coming Soon</p>
                    )}
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
