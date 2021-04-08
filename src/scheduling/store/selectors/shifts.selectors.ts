import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromShifts from '../reducers/shifts.reducer';

import { Shift } from '../../models/shift.model';

export const getShiftState = createSelector(
  fromFeature.getSchedulingState,
  (state: fromFeature.SchedulingState) => state.shifts
);

export const getShiftsEntities = createSelector(
  getShiftState,
  fromShifts.getShiftEntities
);

export const getSelectedShift = createSelector(
  getShiftsEntities,
  fromRoot.getRouterState,
  (entities, router): Shift => {
    return router.state && entities[router.state.params.shiftId];
  }
);

export const getAllShifts = createSelector(
  getShiftsEntities,
  entities => Object.keys(entities).map(id => entities[id])
);

export const getShiftsLoaded = createSelector(
  getShiftState,
  fromShifts.getShiftsLoaded
);

export const getShiftsLoading = createSelector(
  getShiftState,
  fromShifts.getShiftsLoading
);
