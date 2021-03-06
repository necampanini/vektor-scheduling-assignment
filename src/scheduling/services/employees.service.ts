import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`/api/employees`)
      .pipe(catchError((error: any) => of(error.json())));
  }

  createEmployee(payload: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`/api/employees`, payload)
      .pipe(catchError((error: any) => of(error.json())));
  }

  updateEmployee(payload: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`/api/employees/${payload.id}`, payload)
      .pipe(catchError((error: any) => of(error.json())));
  }

  removeEmployee(payload: Employee): Observable<Employee> {
    return this.http
      .delete<any>(`/api/employees/${payload.id}`)
      .pipe(catchError((error: any) => of(error.json())));
  }
}
