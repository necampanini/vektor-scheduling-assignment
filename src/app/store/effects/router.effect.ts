import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as RouterActions from '../actions/router.action';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType<RouterActions.Go>(RouterActions.GO),
        map((action) => action.payload),
        tap(({ path, query: queryParams, extras }) => {
          console.log(path, queryParams, extras);
          this.router.navigate(path, { queryParams, ...extras });
        })
      );
    },
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<RouterActions.Back>(RouterActions.BACK),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<RouterActions.Forward>(RouterActions.FORWARD),
      tap(() => this.location.forward())
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}
}
