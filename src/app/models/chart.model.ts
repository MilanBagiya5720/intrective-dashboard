import { ScaleType } from "@swimlane/ngx-charts";

export interface ChartConfig {
  chartWidth: number;
  chartHeight: number;
  barPadding: number;
  gradient: boolean;
  roundEdges: boolean;
  colorScheme: {
    name: string;
    selectable: boolean;
    group: ScaleType;
    domain: string[];
  };
  zoomLevel: number;
}