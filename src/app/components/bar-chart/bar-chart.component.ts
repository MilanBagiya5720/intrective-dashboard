import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { ChartConfig } from '../../models/chart.model';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @Input() data: any = [];
  @Input() config: ChartConfig;


  constructor(private dataService: DataService) {
    this.dataService.chartConfig$.subscribe(config => {
      this.config = { ...config };
    });
  }
}