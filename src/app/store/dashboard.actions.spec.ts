import * as fromDashboardActions from './dashboard.actions';

describe('Dashboard Actions', () => {
    it('should create SelectMetric action', () => {
        const metric = 'salesData';
        const action = fromDashboardActions.selectMetric({ metric });

        expect(action).toEqual({
            type: '[Dashboard] Select Metric',
            metric: 'salesData',
        });
    });
});
