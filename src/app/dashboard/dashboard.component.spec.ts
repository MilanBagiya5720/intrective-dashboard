import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DataService } from '../services/data.service';
import { of } from 'rxjs';
import { selectMetric } from '../store/dashboard.actions';
import { selectSelectedMetric, selectMetricData } from '../store/dashboard.selectors';
import { AppState } from '../store/app.state';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore<AppState>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataService = jasmine.createSpyObj('DataService', ['loadMetrics']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [StoreModule.forRoot({})],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSelectedMetric, value: 'salesData' },
            { selector: selectMetricData, value: { data: [] } }
          ]
        }),
        { provide: DataService, useValue: dataService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore<AppState>;
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedMetric$ and data$', () => {
    let selectedMetric: string | undefined;
    let data: any;

    component.selectedMetric$.subscribe(value => (selectedMetric = value));
    component.data$.subscribe(value => (data = value));

    expect(selectedMetric).toBe('salesData');
    expect(data).toEqual({ data: [] });
  });

  it('should call loadMetrics on initialization', () => {
    expect(dataService.loadMetrics).toHaveBeenCalled();
  });

  it('should dispatch selectMetric action on metric change', () => {
    spyOn(store, 'dispatch');
    const metric = 'userEngagement';
    component.onMetricChange(metric);

    expect(store.dispatch).toHaveBeenCalledWith(selectMetric({ metric }));
  });

  it('should return correct chart title', () => {
    expect(component.getChartTitle('salesData')).toBe('Sales Performance');
    expect(component.getChartTitle('unknown')).toBe('Dashboard');
  });
});
