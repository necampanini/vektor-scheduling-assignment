import { Injectable} from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromRoot from '../../../app/store'
import * as shiftActions from '../actions/shifts.action'
import * as fromServices from '../../services'

import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs'

@Injectable()
export class ShiftsEffects {
  loadShifts$ = createEffect(() =>
    this.actions$.pipe(
      ofType<shiftActions.LoadShifts>(shiftActions.LOAD_SHIFTS),
      switchMap(() => {
        return this.shiftsService.getShifts().pipe(
          map(shifts => new shiftActions.LoadShiftsSuccess(shifts)),
          catchError((e) => of(new shiftActions.LoadShiftsFail(e)))
        );
      })
    ))

  constructor(private actions$: Actions,
              private shiftsService: fromServices.ShiftsService) {
  }
}

