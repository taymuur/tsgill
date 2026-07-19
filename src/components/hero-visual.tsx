"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { site } from "@/config/site";
import { HeroFieldSVG } from "./hero-field";

const HeroCanvas = dynamic(() => import("./hero-canvas"), { ssr: false });

function webglSupported() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Renders the static clustered field on the server / as a fallback, then upgrades
 * to the live WebGL background when available. All look settings come from
 * `site.hero.background` in the config.
 */
export function HeroVisual() {
  const bg = site.hero.background;
  const [canUseGL, setCanUseGL] = useState(false);
  useEffect(() => {
    // WebGL support is only knowable on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanUseGL(webglSupported());
  }, []);

  if (canUseGL) return <HeroCanvas cfg={bg} />;
  return <HeroFieldSVG palette={bg.palette} groups={bg.groups} />;
}
