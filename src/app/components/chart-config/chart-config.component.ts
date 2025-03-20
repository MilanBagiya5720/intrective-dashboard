import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { ChartConfig } from '../../models/chart.model';

@Component({
  selector: 'app-chart-config',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './chart-config.component.html',
  styleUrls: ['./chart-config.component.scss']
})
export class ChartConfigComponent implements OnInit {
  chartConfig!: ChartConfig;
  selectedColorScheme: string = 'vivid';

  private colorSchemes: { [key: string]: string[] } = {
    vivid: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000', '#00FF00', '#0000FF'],
    natural: ['#8D6E63', '#78909C', '#4CAF50', '#FFC107', '#9C27B0'],
    cool: ['#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50'],
    fire: ['#FF5722', '#FF9800', '#FFC107', '#FFEB3B', '#F44336'],
    solar: ['#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#F44336']
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.chartConfig$.subscribe(config => {
      this.chartConfig = { ...config };
    });
  }

  public updateChartConfig(): void {
    this.dataService.updateData({ ...this.chartConfig });
  }

  onColorSchemeChange(schemeName: string): void {
    const newColors = this.colorSchemes[schemeName] || this.colorSchemes['vivid'];
    this.dataService.updateColorScheme(newColors);
  }

  zoomIn(): void {
    this.chartConfig.zoomLevel = Math.min(this.chartConfig.zoomLevel + 0.1, 2);
    this.updateChartConfig();
  }

  zoomOut(): void {
    this.chartConfig.zoomLevel = Math.max(this.chartConfig.zoomLevel - 0.1, 0.5);
    this.updateChartConfig();
  }

  changeColors(): void {
    const newColors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'];
    this.dataService.updateColorScheme(newColors);
  }
}