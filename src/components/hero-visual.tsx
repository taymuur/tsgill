"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
 * Renders the static cluster field on the server and as a fallback, then upgrades
 * to the live WebGL deconvolution once mounted (when WebGL is available).
 */
export function HeroVisual() {
  const [canUseGL, setCanUseGL] = useState(false);
  useEffect(() => {
    // WebGL support is only knowable on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanUseGL(webglSupported());
  }, []);

  if (canUseGL) return <HeroCanvas />;
  return <HeroFieldSVG />;
}
