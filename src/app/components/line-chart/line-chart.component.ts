import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChartConfig } from '../../models/chart.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  @Input() data: any;
  config: ChartConfig;

  constructor(private dataService: DataService) {
    this.dataService.chartConfig$.subscribe(config => {
      this.config = { ...config };
    })
  }
}
