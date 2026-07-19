"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Cfg = {
  mode: "clusters" | "field";
  groups: number;
  count: number;
  palette: readonly string[];
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Soft round sprite so points read as glowing cells, not squares. */
function makeSprite() {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function Cloud({ reduced, cfg }: { reduced: boolean; cfg: Cfg }) {
  const ref = useRef<THREE.Points>(null);
  const start = useRef<number | null>(null);

  const { geometry, sprite, bulk, target } = useMemo(() => {
    // Seeded PRNG keeps geometry generation pure (no Math.random in render).
    let seed = 0x9e3779b9;
    const rand = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const COUNT = cfg.count;
    const groups = Math.max(1, cfg.groups);
    const bulk = new Float32Array(COUNT * 3);
    const target = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    // Group centroids arranged in a loose ring.
    const centroids = Array.from({ length: groups }, (_, i) => {
      const a = (i / groups) * Math.PI * 2;
      const r = 4.6;
      return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.62, (rand() - 0.5) * 1.4);
    });

    const col = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      const k = i % groups;

      // Bulk: one indistinct central blob.
      const br = Math.pow(rand(), 0.5) * 2.4;
      const bt = rand() * Math.PI * 2;
      const bp = Math.acos(2 * rand() - 1);
      bulk[i * 3] = br * Math.sin(bp) * Math.cos(bt);
      bulk[i * 3 + 1] = br * Math.sin(bp) * Math.sin(bt) * 0.8;
      bulk[i * 3 + 2] = br * Math.cos(bp);

      if (cfg.mode === "field") {
        // Field: a calm wide spread (no tight resolution).
        target[i * 3] = (rand() - 0.5) * 13;
        target[i * 3 + 1] = (rand() - 0.5) * 8;
        target[i * 3 + 2] = (rand() - 0.5) * 4;
      } else {
        // Clusters: each point resolves into its group.
        const c = centroids[k];
        const tr = Math.pow(rand(), 0.7) * 1.15;
        const ta = rand() * Math.PI * 2;
        const tp = Math.acos(2 * rand() - 1);
        target[i * 3] = c.x + tr * Math.sin(tp) * Math.cos(ta);
        target[i * 3 + 1] = c.y + tr * Math.sin(tp) * Math.sin(ta);
        target[i * 3 + 2] = c.z + tr * Math.cos(tp);
      }

      col.set(cfg.palette[k % cfg.palette.length]);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    const initial = reduced ? target.slice() : bulk.slice();
    geometry.setAttribute("position", new THREE.BufferAttribute(initial, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry, sprite: makeSprite(), bulk, target };
  }, [reduced, cfg]);

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;

    // Gentle continuous rotation.
    pts.rotation.y = state.clock.elapsedTime * 0.06;
    pts.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;

    if (reduced) return;

    if (start.current === null) start.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - start.current;
    // Hold ~0.8s as bulk, resolve over ~2.6s, ease-in-out.
    const raw = THREE.MathUtils.clamp((elapsed - 0.8) / 2.6, 0, 1);
    const t = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;

    const pos = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i++) {
      pos[i] = bulk[i] + (target[i] - bulk[i]) * t;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={sprite}
        size={0.11}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.92}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCanvas({ cfg }: { cfg: Cfg }) {
  const reduced = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onError={() => setFailed(true)}
      aria-hidden
    >
      <Cloud reduced={reduced} cfg={cfg} />
    </Canvas>
  );
}
