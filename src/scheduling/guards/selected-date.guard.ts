import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class SelectedDateGuard implements CanActivate {
  constructor(private store: Store<fromStore.SchedulingState>) {}

  canActivate = (): Observable<boolean> =>
    this.store.select(fromStore.getShiftsSelectedDate).pipe(
      tap((date) => {
        if (date == undefined) {
          this.store.dispatch(new fromStore.SetShiftDate(new Date()));
        }
      }),
      filter((date) => !!date),
      map((val) => !!val),
      take(1)
    );
}
