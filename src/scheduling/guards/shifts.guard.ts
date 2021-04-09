import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { of } from 'rxjs';

import * as fromStore from '../store';

@Injectable()
export class ShiftsGuard implements CanActivate {
  constructor(private store: Store<fromStore.SchedulingState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore = (): Observable<boolean> =>
    this.store.select(fromStore.getShiftsLoaded).pipe(
      tap((loaded) => {
        if (!loaded) this.store.dispatch(new fromStore.LoadShifts());
      }),
      filter((loaded) => loaded),
      take(1)
    );
}
