import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScaleType } from '@swimlane/ngx-charts';
import { of } from 'rxjs';
import { ChartConfig } from '../../models/chart.model';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { BarChartComponent } from './bar-chart.component';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;
  let dataServiceMock: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataServiceMock = jasmine.createSpyObj('DataService', ['chartConfig$']);
    dataServiceMock.chartConfig$ = of({
      type: 'pie', colorScheme: {
        name: 'cool',
        selectable: true,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
        group: ScaleType.Ordinal
      }, zoomLevel: 1, chartWidth: 700, chartHeight: 400, barPadding: 8,
      gradient: true,
      roundEdges: true
    } as ChartConfig);


    await TestBed.configureTestingModule({
      imports: [BarChartComponent, SharedModule],
      providers: [{ provide: DataService, useValue: dataServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update config when dataService.chartConfig$ emits a value', () => {
    expect(component.config).toEqual({
      type: 'pie', colorScheme: {
        name: 'cool',
        selectable: true,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
        group: ScaleType.Ordinal
      }, zoomLevel: 1, chartWidth: 700, chartHeight: 400, barPadding: 8,
      gradient: true,
      roundEdges: true
    } as ChartConfig);
  });
});