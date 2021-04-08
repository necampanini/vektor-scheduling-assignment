import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from '../selectors/shifts.selectors';

import { Shift } from '../../models/shift.model';

class MockComponent {
}

describe('Shifts Selectors', () => {
  let store: Store<fromReducers.SchedulingState>;
  let router: Router;

  const employee1: Shift = {
    id: 'c47df9eb-354e-4add-a3e8-934ceda4b251',
    employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
    start: 1617906949704,
    end: 1617906949706,
  };

  const employee2: Shift = {
    id: 'beaa9255-f7b4-45f3-bc0d-7d19feed0247',
    employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
    start: 1617906969704,
    end: 1617916949704
  };

  const employee3: Shift = {
    id: '66d41c92-734b-4624-8057-31b73230966f',
    employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
    start: 1617906949704,
    end: 1617926949704
  };

  const shifts: Shift[] = [employee1, employee2, employee3];

  const entities = {
    'c47df9eb-354e-4add-a3e8-934ceda4b251': shifts[0],
    'beaa9255-f7b4-45f3-bc0d-7d19feed0247': shifts[1],
    '66d41c92-734b-4624-8057-31b73230966f': shifts[2]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'shift/:shiftId', component: MockComponent
          }
        ]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          scheduling: combineReducers(fromReducers.reducers)
        }),
        StoreRouterConnectingModule.forRoot({
          stateKey: 'router'
        })
      ]
    });

    // TODO: .get is deprecated, find latest best practice for testing Store
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  describe('getShiftState', () => {
    it('should return state of shift store slice', () => {
      let result;

      store
        .select(fromSelectors.getShiftState)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false
      });

      store.dispatch(new fromActions.LoadShiftsSuccess(shifts));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false
      });
    });
  });

  describe('getShiftEntities', () => {
    it('should return shifts as entities', () => {
      let result;

      store
        .select(fromSelectors.getShiftsEntities)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadShiftsSuccess(shifts));

      expect(result).toEqual(entities);
    });
  });

  // NC.Note: like the employees selector spec file, I'm providing hardcoded expected state
  // as a work around of testing the built in router reducer
  describe('getSelectedShift', () => {
    it('should return selected shift as an entity', () => {
      let result;
      let routerState = {
        state: {
          url: 'shift/c47df9eb-354e-4add-a3e8-934ceda4b251',
          params: { shiftId: 'c47df9eb-354e-4add-a3e8-934ceda4b251' },
          queryParams: {}
        }
      };

      store
        .select(fromSelectors.getShiftsEntities)
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadShiftsSuccess(shifts));

      expect(fromSelectors.getSelectedShift.projector(result, routerState))
        .toBe(entities['c47df9eb-354e-4add-a3e8-934ceda4b251']);
    });
  });

  describe('getAllShifts', () => {
    it('should return shifts as an array', () => {
      let result;

      store
        .select(fromSelectors.getAllShifts)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadShiftsSuccess(shifts));

      expect(result).toEqual(shifts);
    });
  });

  describe('getShiftsLoaded', () => {
    it('should return the shifts loaded state', () => {
      let result;

      store
        .select(fromSelectors.getShiftsLoaded)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadShiftsSuccess(shifts));

      expect(result).toEqual(true);
    });
  });

  describe('getShiftsLoading', () => {
    it('should return the shifts loading state', () => {
      let result;

      store
        .select(fromSelectors.getShiftsLoading)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadShifts());

      expect(result).toEqual(true);
    });
  });
});
