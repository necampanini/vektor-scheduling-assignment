import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromEmployees from '../reducers/employees.reducer';

import { Employee } from '../../models/employee.model';

export const getEmployeeState = createSelector(
  fromFeature.getSchedulingState,
  (state: fromFeature.SchedulingState) => state.employees
);

export const getEmployeesEntities = createSelector(
  getEmployeeState,
  fromEmployees.getEmployeeEntities
);

export const getSelectedEmployee = createSelector(
  getEmployeesEntities,
  fromRoot.getRouterState,
  (entities, router): Employee =>
    router.state && entities[router.state.params.employeeId]
);

export const getAllEmployees = createSelector(
  getEmployeesEntities,
  (entities) => Object.keys(entities).map((id) => entities[id])
);

export const getEmployeesLoaded = createSelector(
  getEmployeeState,
  fromEmployees.getEmployeesLoaded
);

export const getEmployeesLoading = createSelector(
  getEmployeeState,
  fromEmployees.getEmployeesLoading
);
