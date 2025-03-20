import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartComponent } from './pie-chart.component';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { ChartConfig } from '../../models/chart.model';
import { ScaleType } from '@swimlane/ngx-charts';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
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
      imports: [PieChartComponent, SharedModule],
      providers: [{ provide: DataService, useValue: dataServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
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
