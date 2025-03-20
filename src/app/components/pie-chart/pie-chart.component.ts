import { Component, Input } from '@angular/core';
import { ChartComponent } from '@swimlane/ngx-charts';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../services/data.service';
import { ChartConfig } from '../../models/chart.model';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @Input() data: any;
  config: ChartConfig;

  constructor(private dataService: DataService) {
    this.dataService.chartConfig$.subscribe(config => {
      this.config = { ...config };
    })
  }
}
