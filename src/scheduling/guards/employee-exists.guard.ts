import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class EmployeeExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.SchedulingState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.employeeId;
        return this.hasEmployee(id);
      })
    );
  }

  hasEmployee(id: number): Observable<boolean> {
    return this.store.select(fromStore.getEmployeesEntities).pipe(
      map((entities) => !!entities[id]),
      take(1)
    );
  }

  checkStore = (): Observable<boolean> =>
    this.store.select(fromStore.getEmployeesLoaded).pipe(
      tap((loaded) => {
        if (!loaded) this.store.dispatch(new fromStore.LoadEmployees());
      }),
      filter((loaded) => loaded),
      take(1)
    );
}
