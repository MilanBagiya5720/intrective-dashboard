import { ScaleType } from '@swimlane/ngx-charts';
import { ChartConfig } from '../models/chart.model';
import { DashboardState } from './dashboard.reducer';

export interface AppState {
    dashboard: DashboardState;
}


export interface ChartConfigState {
    chartConfig: ChartConfig;
}

export const initialChartConfigState: ChartConfigState = {
    chartConfig: {
        chartWidth: 700,
        chartHeight: 400,
        barPadding: 8,
        gradient: false,
        roundEdges: true,
        colorScheme: {
            name: 'vivid',
            selectable: true,
            group: ScaleType.Ordinal,
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        },
        zoomLevel: 1
    }
};