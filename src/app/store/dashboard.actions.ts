import { createAction, props } from '@ngrx/store';

export const loadMetrics = createAction('[Dashboard] Load Metrics');
export const loadMetricsSuccess = createAction(
    '[Dashboard] Load Metrics Success',
    props<{ data: any }>()
);
export const selectMetric = createAction(
    '[Dashboard] Select Metric',
    props<{ metric: string }>()
);
export const updateChartOptions = createAction(
    '[Dashboard] Update Chart Options',
    props<{ options: any }>()
);