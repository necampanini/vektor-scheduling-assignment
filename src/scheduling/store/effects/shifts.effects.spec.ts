import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { cold, hot } from 'jasmine-marbles';
import { empty, Observable, of } from 'rxjs';

import { ShiftsService } from '../../services/';
import * as fromEffects from './shifts.effect';
import * as fromActions from '../actions/shifts.action';
import { Shift } from '../../models/shift.model';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('ShiftsEffects', () => {
  let actions$: TestActions;
  let service: ShiftsService;
  let effects: fromEffects.ShiftsEffects;

  const shift1: Shift = {
    id: 'c96627cd-be56-4a76-aa0b-d6f9e664d531',
    employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
    start: new Date('01 Mar 2021 00:00:00 GMT'),
    end: new Date('01 Mar 2021 06:00:00 GMT'),
  };

  const shift2: Shift = {
    id: '8f7257a6-e9f5-47e4-a5d5-68ae0bfa5f81',
    employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
    start: new Date('02 Mar 2021 06:00:00 GMT'),
    end: new Date('02 Mar 2021 09:00:00 GMT'),
  };

  const shifts: Shift[] = [shift1, shift2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ShiftsService,
        fromEffects.ShiftsEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(ShiftsService);
    effects = TestBed.get(fromEffects.ShiftsEffects);

    spyOn(service, 'getShifts').and.returnValue(of(shifts));
    spyOn(service, 'createShift').and.returnValue(of(shifts[0]));
    spyOn(service, 'updateShift').and.returnValue(of(shifts[0]));
    spyOn(service, 'removeShift').and.returnValue(of(shifts[0]));
  });

  describe('loadShifts$', () => {
    it('should return a collection from LoadShiftsSuccess', () => {
      const action = new fromActions.LoadShifts();
      const completion = new fromActions.LoadShiftsSuccess(shifts);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadShifts$).toBeObservable(expected);
    });
  });

  describe('createShift$', () => {
    it('should work', () => {
      const action = new fromActions.CreateShift(shifts[0]);
      const completion = new fromActions.CreateShiftSuccess(shifts[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createShift$).toBeObservable(expected);
    });
  });

  describe('updateShift$', () => {
    it('should work', () => {
      const action = new fromActions.UpdateShift(shifts[0]);
      const completion = new fromActions.UpdateShiftSuccess(shifts[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.updateShift$).toBeObservable(expected);
    });
  });

  describe('removeShift$', () => {
    it('should work', () => {
      const action = new fromActions.RemoveShift(shifts[0]);
      const completion = new fromActions.RemoveShiftSuccess(shifts[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removeShift$).toBeObservable(expected);
    });
  });
});
