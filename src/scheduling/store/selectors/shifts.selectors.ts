import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromShifts from '../reducers/shifts.reducer';
import * as fromEmployees from '../selectors/employees.selectors';

import * as fromUtils from '../../utils';

import { Shift } from '../../models/shift.model';
import { Employee } from '../../models/employee.model';

export const getShiftState = createSelector(
  fromFeature.getSchedulingState,
  (state: fromFeature.SchedulingState) => state.shifts
);

export const getShiftsEntities = createSelector(
  getShiftState,
  fromShifts.getShiftEntities
);

export const getShiftsSelectedDate = createSelector(
  getShiftState,
  fromShifts.getShiftsSelectedDate
);

export const getSelectedShift = createSelector(
  getShiftsEntities,
  fromRoot.getRouterState,
  (entities, router): Shift => {
    return router.state && entities[router.state.params.shiftId];
  }
);

export const getAllShifts = createSelector(getShiftsEntities, (entities) =>
  Object.keys(entities).map((id) => entities[id])
);

export const getEmployeesAndShiftsForDay = () =>
  createSelector(
    fromEmployees.getEmployeesEntities,
    getAllShifts,
    getShiftsSelectedDate,
    (
      employees,
      shifts,
      selectedDate
    ): { employee: Employee; shifts: Shift[] }[] => {
      let dateKey = selectedDate.toISOString().slice(0, 10);

      let keyShiftArray = fromUtils.createKeyShiftsArray(shifts);

      let daysShifts = keyShiftArray
        .filter((keyShift) => keyShift.key == dateKey)
        .map((keyShift) => keyShift.shift);

      let allIds = daysShifts.map((f) => f.employeeId);
      let uniqueIds = [...new Set(allIds)];

      return uniqueIds.map((id) => {
        let employee = employees[id];
        let shifts = daysShifts.filter((f) => f.employeeId == id);
        return {
          employee,
          shifts,
        };
      });
    }
  );

export const getSelectedEmployeesShifts = createSelector(
  getAllShifts,
  fromRoot.getRouterState,
  (shifts, router): Shift[] => {
    return (
      router.state &&
      shifts.filter(
        (shift) => shift.employeeId == router.state.params.employeeId
      )
    );
  }
);

export const getShiftsLoaded = createSelector(
  getShiftState,
  fromShifts.getShiftsLoaded
);

export const getShiftsLoading = createSelector(
  getShiftState,
  fromShifts.getShiftsLoading
);
