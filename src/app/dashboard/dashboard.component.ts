import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { AppState } from '../store/app.state';
import { selectMetric } from '../store/dashboard.actions';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedMetric$: Observable<string>;
  data$: Observable<any>;

  constructor(private store: Store<AppState>, private dashboardService: DataService) {
    this.selectedMetric$ = this.store.select(state => state.dashboard.selectedMetric);
    this.data$ = this.store.select(state => state.dashboard.metrics?.[state.dashboard.selectedMetric]);
  }

  ngOnInit() {
    this.dashboardService.loadMetrics();
  }

  onMetricChange(event: any) {
    const metric = event.value;
    this.store.dispatch(selectMetric({ metric }));
  }
}