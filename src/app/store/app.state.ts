// src/app/store/app.state.ts
import { DashboardState } from './dashboard.reducer';

export interface AppState {
    dashboard: DashboardState;
}