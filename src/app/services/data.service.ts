import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadMetricsSuccess } from '../store/dashboard.actions';
import { ChartConfig } from '../models/chart.model';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    colorScheme: Color = {
        name: 'vivid',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000', '#00FF00', '#0000FF'] // Added more colors here
    };

    private chartConfigSubject = new BehaviorSubject<ChartConfig>({
        chartWidth: 700,
        chartHeight: 400,
        barPadding: 8,
        gradient: false,
        roundEdges: true,
        colorScheme: this.colorScheme,
        zoomLevel: 1
    });

    chartConfig$: Observable<ChartConfig> = this.chartConfigSubject.asObservable();

    constructor(private http: HttpClient, private store: Store) { }

    loadMetrics() {
        this.http.get('assets/mock-data.json').subscribe((data: any) => {
            this.store.dispatch(loadMetricsSuccess({ data }));
        });
    }

    updateData(value: ChartConfig): void {
        this.chartConfigSubject.next(value);
    }

    updateColorScheme(newColors: string[]): void {
        const newColorScheme: Color = {
            ...this.colorScheme,
            domain: newColors
        };

        const updatedConfig: ChartConfig = {
            ...this.chartConfigSubject.value,
            colorScheme: newColorScheme
        };

        this.chartConfigSubject.next(updatedConfig);
    }
}