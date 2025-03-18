import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LineChartComponent, NgxChartsModule, PieChartComponent } from '@swimlane/ngx-charts';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';

const modules = [
  MatGridListModule,
  MatCardModule,
  CommonModule,
  FormsModule,
  MatSidenavModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  NgxChartsModule,
  MatListModule,
  MatMenuModule,
]

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule { }