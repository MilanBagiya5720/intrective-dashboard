import { Component, OnInit } from '@angular/core';
import { ChartConfig } from '../../models/chart.model';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';

interface ColorSchemeOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-chart-config',
  standalone: true,
  imports: [
    SharedModule,

  ],
  templateUrl: './chart-config.component.html',
  styleUrls: ['./chart-config.component.scss']
})
export class ChartConfigComponent implements OnInit {
  chartConfig!: ChartConfig;
  selectedColorScheme = 'vivid';

  readonly colorSchemeOptions: ColorSchemeOption[] = [
    { value: 'vivid', label: 'Vivid' },
    { value: 'natural', label: 'Natural' },
    { value: 'cool', label: 'Cool' },
    { value: 'fire', label: 'Fire' },
    { value: 'solar', label: 'Solar' }
  ];

  private readonly colorSchemes: Record<string, string[]> = {
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

  updateChartConfig(): void {
    this.dataService.updateData({ ...this.chartConfig });
  }

  onColorSchemeChange(scheme: string): void {
    const colors = this.colorSchemes[scheme] || this.colorSchemes['vivid'];
    this.dataService.updateColorScheme(colors);
  }

  zoomIn(): void {
    this.chartConfig.zoomLevel = Math.min(this.chartConfig.zoomLevel + 0.1, 2);
    this.updateChartConfig();
  }

  zoomOut(): void {
    this.chartConfig.zoomLevel = Math.max(this.chartConfig.zoomLevel - 0.1, 0.5);
    this.updateChartConfig();
  }
}