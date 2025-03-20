import { Component, Input } from '@angular/core';
import { ChartConfig } from '../../models/chart.model';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-vertical-chart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './vertical-chart.component.html',
  styleUrl: './vertical-chart.component.scss'
})
export class VerticalChartComponent {
  @Input() data: any = [];
  @Input() config: ChartConfig;

  constructor(private dataService: DataService) {
    this.dataService.chartConfig$.subscribe(config => {
      this.config = { ...config };
    });
  }
}
