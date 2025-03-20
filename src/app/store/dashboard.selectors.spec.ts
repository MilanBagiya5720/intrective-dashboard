import { DashboardState } from './dashboard.reducer';
import { selectDashboardState, selectSelectedMetric, selectMetricData } from './dashboard.selectors';

describe('Dashboard Selectors', () => {
    const initialState: DashboardState = {
        selectedMetric: 'salesData',
        metrics: {
            salesData: [{ value: 100, label: 'January' }],
            userEngagement: [{ value: 200, label: 'February' }]
        },
        chartOptions: {}
    };

    it('should select the dashboard state', () => {
        expect(selectDashboardState.projector(initialState)).toEqual(initialState);
    });

    it('should select the selected metric', () => {
        expect(selectSelectedMetric.projector(initialState)).toEqual('salesData');
    });

    it('should select metric data for the selected metric', () => {
        expect(selectMetricData.projector(initialState)).toEqual([{ value: 100, label: 'January' }]);
    });

    it('should return an empty array if selected metric has no data', () => {
        const emptyState: DashboardState = {
            selectedMetric: 'nonExistingMetric',
            metrics: {},
            chartOptions: {}
        };
        expect(selectMetricData.projector(emptyState)).toEqual([]);
    });

    it('should return metric data when metric exists', () => {
        const state: DashboardState = {
            selectedMetric: 'salesData',
            metrics: { salesData: [100, 200, 300] },
            chartOptions: {}
        };
        expect(selectMetricData.projector(state)).toEqual([100, 200, 300]);
    });
});
