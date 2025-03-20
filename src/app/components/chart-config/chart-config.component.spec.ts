import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartConfigComponent } from './chart-config.component';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { ChartConfig } from '../../models/chart.model';
import { ScaleType } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChartConfigComponent', () => {
  let component: ChartConfigComponent;
  let fixture: ComponentFixture<ChartConfigComponent>;
  let dataServiceMock: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataServiceMock = jasmine.createSpyObj('DataService', ['chartConfig$', 'updateData', 'updateColorScheme']);
    dataServiceMock.chartConfig$ = of({
      type: 'pie',
      colorScheme: {
        name: 'cool',
        selectable: true,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
        group: ScaleType.Ordinal
      },
      zoomLevel: 1,
      chartWidth: 700,
      chartHeight: 400,
      barPadding: 8,
      gradient: true,
      roundEdges: true
    } as ChartConfig);

    await TestBed.configureTestingModule({
      imports: [ChartConfigComponent, SharedModule, BrowserAnimationsModule],
      providers: [{ provide: DataService, useValue: dataServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chartConfig when dataService.chartConfig$ emits a value', () => {
    expect(component.chartConfig).toEqual({
      type: 'pie',
      colorScheme: {
        name: 'cool',
        selectable: true,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
        group: ScaleType.Ordinal
      },
      zoomLevel: 1,
      chartWidth: 700,
      chartHeight: 400,
      barPadding: 8,
      gradient: true,
      roundEdges: true
    } as ChartConfig);
  });

  it('should call updateData when updateChartConfig is called', () => {
    component.updateChartConfig();
    expect(dataServiceMock.updateData).toHaveBeenCalledWith(component.chartConfig);
  });

  it('should update color scheme when onColorSchemeChange is called with a valid scheme', () => {
    component.onColorSchemeChange('cool');
    expect(dataServiceMock.updateColorScheme).toHaveBeenCalledWith(['#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50']);
  });

  it('should default to "vivid" color scheme when onColorSchemeChange is called with an invalid scheme', () => {
    component.onColorSchemeChange('invalidScheme');
    expect(dataServiceMock.updateColorScheme).toHaveBeenCalledWith(['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000', '#00FF00', '#0000FF']);
  });

  it('should zoom in within limits', () => {
    component.chartConfig.zoomLevel = 1.5;
    component.zoomIn();
    expect(component.chartConfig.zoomLevel).toBe(1.6);
  });

  it('should not exceed max zoom level (2)', () => {
    component.chartConfig.zoomLevel = 1.9;
    component.zoomIn();
    expect(component.chartConfig.zoomLevel).toBe(2);
  });

  it('should zoom out within limits', () => {
    component.chartConfig.zoomLevel = 1.5;
    component.zoomOut();
    expect(component.chartConfig.zoomLevel).toBe(1.4);
  });

  it('should not go below min zoom level (0.5)', () => {
    component.chartConfig.zoomLevel = 0.6;
    component.zoomOut();
    expect(component.chartConfig.zoomLevel).toBe(0.5);
  });

  it('should call updateData on zoom in', () => {
    component.zoomIn();
    expect(dataServiceMock.updateData).toHaveBeenCalled();
  });

  it('should call updateData on zoom out', () => {
    component.zoomOut();
    expect(dataServiceMock.updateData).toHaveBeenCalled();
  });
});
