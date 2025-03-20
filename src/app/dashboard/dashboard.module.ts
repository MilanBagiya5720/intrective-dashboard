import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { ChartConfigComponent } from '../components/chart-config/chart-config.component';
import { HeaderComponent } from '../components/header/header.component';
import { LineChartComponent } from '../components/line-chart/line-chart.component';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { VerticalChartComponent } from '../components/vertical-chart/vertical-chart.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    SidebarComponent,
    HeaderComponent,
    PieChartComponent,
    LineChartComponent,
    BarChartComponent,
    ChartConfigComponent,
    VerticalChartComponent
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }


