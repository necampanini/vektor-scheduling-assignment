import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { Shift } from '../models/shift.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class ShiftsService {
  constructor(private http: HttpClient) {
  }

  getShifts(): Observable<Shift[]> {
    return this.http
      .get<Shift[]>(`/api/shifts`)
      .pipe(catchError((error: any) => of(error.json())));
  }

  createShift(payload: Shift): Observable<Shift> {
    return this.http
      .post<Shift>(`/api/shifts`, payload)
      .pipe(catchError((error: any) => of(error.json())));
  }

  updateShift(payload: Shift): Observable<Shift> {
    return this.http
      .put<Shift>(`/api/shifts/${ payload.id }`, payload)
      .pipe(catchError((error: any) => of(error.json())));
  }

  removeShift(payload: Shift): Observable<Shift> {
    return this.http
      .delete<any>(`/api/shifts/${ payload.id }`)
      .pipe(catchError((error: any) => of(error.json())));
  }
}
