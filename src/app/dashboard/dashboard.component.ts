import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { AppState } from '../store/app.state';
import { selectMetric } from '../store/dashboard.actions';

interface MetricOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedMetric$: Observable<string>;
  data$: Observable<any>;

  readonly metrics: MetricOption[] = [
    { value: 'salesData', label: 'Sales Data' },
    { value: 'userEngagement', label: 'User Engagement' },
    { value: 'performanceStats', label: 'Performance Stats' },
    { value: 'stockData', label: 'Stock Data' }
  ];

  private readonly chartTitles: Record<string, string> = {
    salesData: 'Sales Performance',
    userEngagement: 'User Engagement Distribution',
    performanceStats: 'Performance Metrics',
    stockData: 'Stock Data Overview'
  };

  constructor(
    private store: Store<AppState>,
    private dataService: DataService
  ) {
    this.selectedMetric$ = this.store.select(state => state.dashboard.selectedMetric);
    this.data$ = this.store.select(state => state.dashboard.metrics?.[state.dashboard.selectedMetric]);
  }

  ngOnInit(): void {
    this.dataService.loadMetrics();
  }

  onMetricChange(metric: string): void {
    this.store.dispatch(selectMetric({ metric }));
  }

  getChartTitle(metric: string): string {
    return this.chartTitles[metric] || 'Dashboard';
  }
}