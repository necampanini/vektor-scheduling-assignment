import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/employees.action';
import * as fromServices from '../../services';

import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable()
export class EmployeesEffects {
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromActions.LoadEmployees>(fromActions.LOAD_EMPLOYEES),
      switchMap(() => {
        return this.employeesService.getEmployees().pipe(
          map((employees) => new fromActions.LoadEmployeesSuccess(employees)),
          catchError((e) => of(new fromActions.LoadEmployeesFail(e)))
        );
      })
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromActions.CreateEmployee>(fromActions.CREATE_EMPLOYEE),
      // NC.Note: to support/store GUIDs as Ids, hook in here to create one before it's sent off to the service
      map((action: fromActions.CreateEmployee) => ({
        id: Guid.create().toString(),
        ...action.payload,
      })),
      switchMap((employee) => {
        return this.employeesService.createEmployee(employee).pipe(
          map((employee) => new fromActions.CreateEmployeeSuccess(employee)),
          catchError((error) => of(new fromActions.CreateEmployeeFail(error)))
        );
      })
    )
  );

  // create employee success, should it immediately route to it?

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromActions.UpdateEmployee>(fromActions.UPDATE_EMPLOYEE),
      map((action: fromActions.UpdateEmployee) => action.payload),
      switchMap((employee) => {
        return this.employeesService.updateEmployee(employee).pipe(
          map((employee) => new fromActions.UpdateEmployeeSuccess(employee)),
          catchError((error) => of(new fromActions.UpdateEmployeeFail(error)))
        );
      })
    )
  );

  removeEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromActions.RemoveEmployee>(fromActions.REMOVE_EMPLOYEE),
      map((action: fromActions.RemoveEmployee) => action.payload),
      switchMap((employee) => {
        return this.employeesService.removeEmployee(employee).pipe(
          map((employee) => new fromActions.RemoveEmployeeSuccess(employee)),
          catchError((error) => of(new fromActions.RemoveEmployeeFail(error)))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private employeesService: fromServices.EmployeesService
  ) {}
}
