import type { FigureKind } from "@/content/projects";

const clusterColors = ["#35e0c2", "#7c9cff", "#ff8a5b", "#b98cff", "#4ed8ff", "#ffd166", "#f871a0"];

/* Deterministic pseudo-random so SSR and client match. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/** Deconvolution: a bulk field resolving into labelled cell-type clusters. */
export function DeconvFigure() {
  const rand = rng(7);
  const clusters = clusterColors.map((c, i) => ({
    c,
    cx: 55 + (i % 4) * 78 + rand() * 20,
    cy: 55 + Math.floor(i / 4) * 95 + rand() * 20,
  }));
  const dots = Array.from({ length: 320 }, () => {
    const k = Math.floor(rand() * clusters.length);
    const cl = clusters[k];
    const a = rand() * Math.PI * 2;
    const r = rand() * 34;
    return { x: cl.cx + Math.cos(a) * r, y: cl.cy + Math.sin(a) * r, c: cl.c };
  });
  return (
    <FigureFrame label="Bulk RNA-seq → deconvolved cell types">
      <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label="Single-cell clusters resolved from bulk expression">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.7} fill={d.c} opacity={0.85} />
        ))}
      </svg>
    </FigureFrame>
  );
}

/** EEG traces with a swept attention band. */
export function EEGFigure() {
  const rand = rng(21);
  const rows = 5;
  const paths = Array.from({ length: rows }, (_, r) => {
    let d = `M0 ${30 + r * 38}`;
    for (let x = 0; x <= 360; x += 6) {
      const y = 30 + r * 38 + Math.sin(x / 9 + r) * 8 * (0.4 + rand()) + (rand() - 0.5) * 5;
      d += ` L${x} ${y.toFixed(1)}`;
    }
    return d;
  });
  return (
    <FigureFrame label="EEG traces · multi-head attention">
      <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label="EEG waveforms with an attention window">
        <rect x={150} y={4} width={70} height={212} fill="#ff8a5b" opacity={0.12} />
        <rect x={150} y={4} width={70} height={212} fill="none" stroke="#ff8a5b" strokeOpacity={0.5} strokeDasharray="3 3" />
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#35e0c2" strokeWidth={1.3} opacity={0.85} />
        ))}
      </svg>
    </FigureFrame>
  );
}

/** Forecast: history solid, forecast dashed with a confidence band. */
export function ForecastFigure() {
  const rand = rng(5);
  const pts: [number, number][] = [];
  for (let x = 0; x <= 360; x += 8) {
    const seasonal = Math.sin(x / 30) * 40;
    const y = 120 - seasonal + (rand() - 0.5) * 14;
    pts.push([x, y]);
  }
  const split = Math.floor(pts.length * 0.62);
  const hist = pts.slice(0, split);
  const fut = pts.slice(split - 1);
  const toPath = (p: [number, number][]) => p.map((q, i) => `${i ? "L" : "M"}${q[0]} ${q[1].toFixed(1)}`).join(" ");
  const band = `${toPath(fut.map(([x, y]) => [x, y - 14]))} L${fut[fut.length - 1][0]} ${(fut[fut.length - 1][1] + 14).toFixed(1)} ${toPath(
    [...fut].reverse().map(([x, y]) => [x, y + 14]),
  ).replace("M", "L")} Z`;
  return (
    <FigureFrame label="Influenza forecast · RMSE 873.27 @ 1 week">
      <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label="Time series with a forecast horizon">
        <path d={band} fill="#4ed8ff" opacity={0.14} />
        <path d={toPath(hist)} fill="none" stroke="#7c9cff" strokeWidth={1.8} />
        <path d={toPath(fut)} fill="none" stroke="#4ed8ff" strokeWidth={1.8} strokeDasharray="5 4" />
        <line x1={hist[hist.length - 1][0]} y1={10} x2={hist[hist.length - 1][0]} y2={210} stroke="#9aa7bd" strokeOpacity={0.35} strokeDasharray="2 3" />
      </svg>
    </FigureFrame>
  );
}

/** EMD: a composite signal peeling into intrinsic mode functions. */
export function EMDFigure() {
  const rand = rng(13);
  const layer = (freq: number, amp: number, offset: number, color: string) => {
    let d = `M0 ${offset}`;
    for (let x = 0; x <= 360; x += 6) {
      const y = offset + Math.sin(x / freq) * amp + (rand() - 0.5) * 2;
      d += ` L${x} ${y.toFixed(1)}`;
    }
    return { d, color };
  };
  const layers = [
    layer(6, 6, 34, "#f871a0"),
    layer(14, 10, 84, "#b98cff"),
    layer(30, 14, 140, "#35e0c2"),
    layer(70, 10, 194, "#ffd166"),
  ];
  return (
    <FigureFrame label="Complex EMD · harmonic fit R² = 0.848">
      <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label="Signal decomposed into intrinsic mode functions">
        {layers.map((l, i) => (
          <path key={i} d={l.d} fill="none" stroke={l.color} strokeWidth={1.5} opacity={0.9} />
        ))}
      </svg>
    </FigureFrame>
  );
}

function FigureFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="aspect-[16/10] w-full">{children}</div>
      <figcaption className="mono-label border-t border-border px-4 py-3">{label}</figcaption>
    </figure>
  );
}

export function Figure({ kind }: { kind: FigureKind }) {
  switch (kind) {
    case "deconv":
      return <DeconvFigure />;
    case "eeg":
      return <EEGFigure />;
    case "forecast":
      return <ForecastFigure />;
    case "emd":
      return <EMDFigure />;
    default:
      return null;
  }
}
