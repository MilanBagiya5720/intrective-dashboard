import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { DataService } from './data.service';
import { ChartConfig } from '../models/chart.model';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { loadMetricsSuccess } from '../store/dashboard.actions';
import { BehaviorSubject } from 'rxjs';

describe('DataService', () => {
    let service: DataService;
    let httpMock: HttpTestingController;
    let store: Store;
    let mockDispatch: jasmine.Spy;

    const mockColorScheme: Color = {
        name: 'vivid',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000', '#00FF00', '#0000FF']
    };

    const mockChartConfig: ChartConfig = {
        chartWidth: 700,
        chartHeight: 400,
        barPadding: 8,
        gradient: false,
        roundEdges: true,
        colorScheme: mockColorScheme,
        zoomLevel: 1
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({})
            ],
            providers: [DataService]
        });

        service = TestBed.inject(DataService);
        httpMock = TestBed.inject(HttpTestingController);
        store = TestBed.inject(Store);
        mockDispatch = spyOn(store, 'dispatch');
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with correct colorScheme', () => {
        expect(service['colorScheme']).toEqual(mockColorScheme);
    });

    it('should initialize chartConfigSubject with default values', () => {
        const chartConfigSubject = service['chartConfigSubject'] as BehaviorSubject<ChartConfig>;
        expect(chartConfigSubject.value).toEqual(mockChartConfig);
    });

    it('should provide chartConfig$ observable', (done) => {
        service.chartConfig$.subscribe(config => {
            expect(config).toEqual(mockChartConfig);
            done();
        });
    });

    describe('loadMetrics', () => {
        it('should fetch data and dispatch loadMetricsSuccess action', () => {
            const mockData = { test: 'data' };

            service.loadMetrics();

            const req = httpMock.expectOne('assets/mock-data.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockData);

            expect(mockDispatch).toHaveBeenCalledWith(loadMetricsSuccess({ data: mockData }));
        });
    });

    describe('updateData', () => {
        it('should update chartConfigSubject with new value', (done) => {
            const newConfig: ChartConfig = {
                ...mockChartConfig,
                chartWidth: 800
            };

            service.updateData(newConfig);

            service.chartConfig$.subscribe(config => {
                expect(config).toEqual(newConfig);
                done();
            });
        });
    });

    describe('updateColorScheme', () => {
        it('should update color scheme with new colors', (done) => {
            const newColors = ['#111111', '#222222'];

            service.updateColorScheme(newColors);

            service.chartConfig$.subscribe(config => {
                expect(config.colorScheme.domain).toEqual(newColors);
                expect(config.colorScheme.name).toBe('vivid');
                expect(config.colorScheme.selectable).toBeTrue();
                expect(config.colorScheme.group).toBe(ScaleType.Ordinal);

                expect(config.chartWidth).toBe(700);
                expect(config.chartHeight).toBe(400);
                expect(config.barPadding).toBe(8);
                expect(config.gradient).toBeFalse();
                expect(config.roundEdges).toBeTrue();
                expect(config.zoomLevel).toBe(1);
                done();
            });
        });
    });
});