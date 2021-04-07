import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEmployees from './employees.reducer'
import * as fromShifts from './shifts.reducer'

export interface SchedulingState {
  employees: fromEmployees.EmployeesState,
  shifts: fromShifts.ShiftsState
}

export const reducers: ActionReducerMap<SchedulingState> = {
  employees: fromEmployees.reducer,
  shifts: fromShifts.reducer
}

// selector for entire lazy loaded module
// feature name corresponds to StoreModule.forFeature("scheduling", reducer)
export const getSchedulingState = createFeatureSelector("scheduling")
