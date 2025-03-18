import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loadMetricsSuccess } from '../store/dashboard.actions';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient, private store: Store) { }

    loadMetrics() {
        this.http.get('assets/mock-data.json').subscribe((data: any) => {
            this.store.dispatch(loadMetricsSuccess({ data }));
        });
    }
}