  import { Injectable} from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromRoot from '../../../app/store'
import * as employeeActions from '../actions/employees.action'
import * as fromServices from '../../services'

import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs'

@Injectable()
export class EmployeesEffects {
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType<employeeActions.LoadEmployees>(employeeActions.LOAD_EMPLOYEES),
      switchMap(() => {
        return this.employeesService.getEmployees().pipe(
          map(employees => new employeeActions.LoadEmployeesSuccess(employees)),
          catchError((e) => of(new employeeActions.LoadEmployeesFail(e)))
        );
      })
    ))

  constructor(private actions$: Actions,
              private employeesService: fromServices.EmployeesService) {
  }
}

