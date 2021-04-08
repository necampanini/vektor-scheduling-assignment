import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as shiftActions from '../actions/shifts.action';
import * as fromServices from '../../services';

import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';

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
    ));

  createShift$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<shiftActions.CreateShift>(shiftActions.CREATE_SHIFT),
      map((action: shiftActions.CreateShift) => action.payload),
      switchMap(shift => {
        return this.shiftsService.createShift(shift).pipe(
          map(shift => new shiftActions.CreateShiftSuccess(shift)),
          catchError(error => of(new shiftActions.CreateShiftFail(error)))
        );
      })
    );
  });

  updateShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType<shiftActions.UpdateShift>(shiftActions.UPDATE_SHIFT),
      map((action: shiftActions.UpdateShift) => action.payload),
      switchMap(shift => {
        return this.shiftsService.updateShift(shift).pipe(
          map(shift => new shiftActions.UpdateShiftSuccess(shift)),
          catchError(error => of(new shiftActions.UpdateShiftFail(error)))
        );
      })
    ));

  removeShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType<shiftActions.RemoveShift>(shiftActions.REMOVE_SHIFT),
      map((action: shiftActions.RemoveShift) => action.payload),
      switchMap(shift => {
        return this.shiftsService.removeShift(shift).pipe(
          map(shift => new shiftActions.RemoveShiftSuccess(shift)),
          catchError(error => of(new shiftActions.RemoveShiftFail(error)))
        );
      })
    ));

  constructor(private actions$: Actions,
              private shiftsService: fromServices.ShiftsService) {
  }
}

