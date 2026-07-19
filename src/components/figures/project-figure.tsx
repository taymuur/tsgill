import type { FigureSpec } from "@/content/projects";
import { ProportionsFigure } from "./proportions-figure";
import { SignalFigure } from "./signal-figure";
import { TimeseriesFigure } from "./timeseries-figure";
import { LayersFigure } from "./layers-figure";

/** Renders whatever figure a project declares in its data. No topic logic here. */
export function ProjectFigure({ spec }: { spec: FigureSpec }) {
  switch (spec.type) {
    case "proportions":
      return <ProportionsFigure {...spec} />;
    case "signal":
      return <SignalFigure {...spec} />;
    case "timeseries":
      return <TimeseriesFigure {...spec} />;
    case "layers":
      return <LayersFigure {...spec} />;
    case "none":
    default:
      return null;
  }
}
