import { dashboardReducer, initialState } from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';

describe('Dashboard Reducer', () => {
    it('should return the default state when an unknown action is dispatched', () => {
        const action = { type: 'UNKNOWN_ACTION' } as any;
        const state = dashboardReducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it('should update selectedMetric when selectMetric action is dispatched', () => {
        const action = DashboardActions.selectMetric({ metric: 'userEngagement' });
        const state = dashboardReducer(initialState, action);

        expect(state.selectedMetric).toBe('userEngagement');
    });

    it('should update metrics when loadMetricsSuccess action is dispatched', () => {
        const mockMetrics = { salesData: [100, 200, 300] };
        const action = DashboardActions.loadMetricsSuccess({ data: mockMetrics });
        const state = dashboardReducer(initialState, action);

        expect(state.metrics).toEqual(mockMetrics);
    });

    it('should update chartOptions when updateChartOptions action is dispatched', () => {
        const newChartOptions = { theme: 'dark', legend: true };
        const action = DashboardActions.updateChartOptions({ options: newChartOptions });
        const state = dashboardReducer(initialState, action);

        expect(state.chartOptions).toEqual(newChartOptions);
    });

    it('should not mutate the previous state', () => {
        const newState = dashboardReducer(initialState, DashboardActions.selectMetric({ metric: 'sales' }));

        expect(newState).not.toBe(initialState);
        expect(initialState.selectedMetric).toBe('');
    });
});
