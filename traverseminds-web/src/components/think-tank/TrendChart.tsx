"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TrendSeries } from "@/lib/worldbank";

const M = { top: 16, right: 104, bottom: 32, left: 40 };

const HIGHLIGHT = "#ff4c00";
const PEER = "#919499";

type Props = { series: TrendSeries[]; highlight: string; unit: string; suffix?: string };

export function TrendChart({ series, highlight, unit, suffix = "%" }: Props) {
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  // Draw at the container's real pixel width so text stays legible on phones instead of shrinking
  const wrapRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(760);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(280, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = W < 480 ? 240 : 320;
  const xTickEvery = W < 480 ? 8 : 4;

  const { years, x, y, yTicks } = useMemo(() => {
    const allYears = series.flatMap((s) => s.points.map((p) => p.year));
    const minYear = Math.min(...allYears);
    const maxYear = Math.max(...allYears);
    const rawMax = Math.max(...series.flatMap((s) => s.points.map((p) => p.value)));
    const step = rawMax > 50 ? 20 : rawMax > 20 ? 10 : 5;
    const maxY = Math.ceil(rawMax / step) * step;
    const x = (year: number) => M.left + ((year - minYear) / (maxYear - minYear)) * (W - M.left - M.right);
    const y = (v: number) => M.top + (1 - v / maxY) * (H - M.top - M.bottom);
    const yTicks = Array.from({ length: maxY / step + 1 }, (_, i) => i * step);
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
    return { years, x, y, yTicks };
  }, [series, W, H]);

  // Draw peers first so the highlighted series sits on top
  const ordered = [...series].sort((a, b) => Number(a.iso3 === highlight) - Number(b.iso3 === highlight));
  const xTicks = years.filter((yr) => yr % xTickEvery === 0);

  const valueAt = (s: TrendSeries, year: number) => s.points.find((p) => p.year === year)?.value;

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const rect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const nearest = years.reduce((best, yr) => (Math.abs(x(yr) - px) < Math.abs(x(best) - px) ? yr : best), years[0]);
    setHoverYear(nearest);
  };

  // Spread end labels apart so they never overlap
  const endLabels = useMemo(() => {
    const labels = series.map((s) => {
      const last = s.points[s.points.length - 1];
      return { iso3: s.iso3, name: s.name, value: last.value, ty: y(last.value) };
    }).sort((a, b) => a.ty - b.ty);
    for (let i = 1; i < labels.length; i++) {
      if (labels[i].ty - labels[i - 1].ty < 16) labels[i].ty = labels[i - 1].ty + 16;
    }
    return labels;
  }, [series, y]);

  const fmt = (v: number) => `${v.toFixed(1)}${suffix}`;

  return (
    <figure style={{ margin: 0, minWidth: 0 }}>
      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginBottom: 12, fontSize: 13, color: "#515459" }}>
        {series.map((s) => (
          <span key={s.iso3} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 16, height: 2, background: s.iso3 === highlight ? HIGHLIGHT : PEER }} aria-hidden />
            {s.name}
          </span>
        ))}
      </div>

      <div ref={wrapRef} style={{ position: "relative", width: "100%", minWidth: 0 }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`${unit}, ${years[0]}–${years[years.length - 1]}`} style={{ display: "block", overflow: "visible" }}>
          {/* Recessive grid + y axis */}
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} stroke="#e1e4e9" strokeWidth={1} />
              <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={11} fill="#919499">{t}{suffix}</text>
            </g>
          ))}
          {xTicks.map((yr) => (
            <text key={yr} x={x(yr)} y={H - 8} textAnchor="middle" fontSize={11} fill="#919499">{yr}</text>
          ))}

          {/* Lines */}
          {ordered.map((s) => (
            <polyline
              key={s.iso3}
              fill="none"
              stroke={s.iso3 === highlight ? HIGHLIGHT : PEER}
              strokeWidth={s.iso3 === highlight ? 2.5 : 1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              points={s.points.map((p) => `${x(p.year)},${y(p.value)}`).join(" ")}
            />
          ))}

          {/* Direct end labels */}
          {endLabels.map((l) => (
            <text
              key={l.iso3}
              x={W - M.right + 8}
              y={l.ty}
              dy="0.32em"
              fontSize={12}
              fontWeight={l.iso3 === highlight ? 600 : 400}
              fill={l.iso3 === highlight ? "#000" : "#515459"}
            >
              {l.name} {fmt(l.value)}
            </text>
          ))}

          {/* Crosshair */}
          {hoverYear !== null && (
            <g pointerEvents="none">
              <line x1={x(hoverYear)} x2={x(hoverYear)} y1={M.top} y2={H - M.bottom} stroke="#515459" strokeWidth={1} strokeDasharray="3 3" />
              {series.map((s) => {
                const v = valueAt(s, hoverYear);
                return v === undefined ? null : (
                  <circle key={s.iso3} cx={x(hoverYear)} cy={y(v)} r={4} fill={s.iso3 === highlight ? HIGHLIGHT : PEER} stroke="#fff" strokeWidth={2} />
                );
              })}
            </g>
          )}

          {/* Hit area */}
          <rect
            x={M.left}
            y={M.top}
            width={W - M.left - M.right}
            height={H - M.top - M.bottom}
            fill="transparent"
            onPointerMove={onMove}
            onPointerLeave={() => setHoverYear(null)}
          />
        </svg>

        {hoverYear !== null && (
          <div
            role="status"
            style={{
              position: "absolute",
              top: 0,
              left: `${(x(hoverYear) / W) * 100}%`,
              transform: x(hoverYear) > W / 2 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              padding: "8px 12px",
              fontSize: 12,
              pointerEvents: "none",
              minWidth: 140,
            }}
          >
            <div style={{ fontWeight: 600, color: "#000", marginBottom: 4 }}>{hoverYear}</div>
            {[...series]
              .map((s) => ({ s, v: valueAt(s, hoverYear) }))
              .filter((d) => d.v !== undefined)
              .sort((a, b) => b.v! - a.v!)
              .map(({ s, v }) => (
                <div key={s.iso3} style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "#515459" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 2, background: s.iso3 === highlight ? HIGHLIGHT : PEER }} aria-hidden />
                    {s.name}
                  </span>
                  <span style={{ color: "#212429", fontVariantNumeric: "tabular-nums" }}>{fmt(v!)}</span>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Table view for screen readers and anyone who prefers numbers */}
      <details style={{ marginTop: 12, fontSize: 13, color: "#515459" }}>
        <summary style={{ cursor: "pointer" }}>View as table</summary>
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table style={{ borderCollapse: "collapse", fontVariantNumeric: "tabular-nums", minWidth: 360 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "4px 12px 4px 0" }}>Year</th>
                {series.map((s) => <th key={s.iso3} style={{ textAlign: "right", padding: "4px 0 4px 12px" }}>{s.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {[...years].reverse().map((yr) => (
                <tr key={yr} style={{ borderTop: "1px solid #e1e4e9" }}>
                  <td style={{ padding: "4px 12px 4px 0" }}>{yr}</td>
                  {series.map((s) => {
                    const v = valueAt(s, yr);
                    return <td key={s.iso3} style={{ textAlign: "right", padding: "4px 0 4px 12px" }}>{v === undefined ? "—" : fmt(v)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
