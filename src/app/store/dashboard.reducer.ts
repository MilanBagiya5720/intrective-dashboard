import { createReducer, on } from '@ngrx/store';
import { loadMetricsSuccess, selectMetric, updateChartOptions } from './dashboard.actions';

export interface DashboardState {
    metrics: any;
    selectedMetric: string;
    chartOptions: any;
}

export const initialState: DashboardState = {
    metrics: {},
    selectedMetric: '',
    chartOptions: {}
};

export const dashboardReducer = createReducer(
    initialState,
    on(loadMetricsSuccess, (state, { data }) => ({ ...state, metrics: data })),
    on(selectMetric, (state, { metric }) => ({ ...state, selectedMetric: metric })),
    on(updateChartOptions, (state, { options }) => ({ ...state, chartOptions: options }))
);