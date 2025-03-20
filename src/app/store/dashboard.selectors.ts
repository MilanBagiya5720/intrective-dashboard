import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectSelectedMetric = createSelector(
    selectDashboardState,
    (state) => state.selectedMetric
);

export const selectMetricData = createSelector(
    selectDashboardState,
    (state) => state.metrics[state.selectedMetric] || []
);
