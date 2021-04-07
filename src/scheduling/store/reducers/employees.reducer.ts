import { Employee } from '../../models/employee.model';

import * as fromEmployees from '../actions';
import * as fromUtils from '../../../app/store/reducers/common-reducer.utils';

export interface EmployeeState extends fromUtils.BaseEntityInterface<Employee> {
}

export const initialState: EmployeeState = {
  entities: {},
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: fromEmployees.EmployeesAction): EmployeeState {
  switch (action.type) {
    case fromEmployees.LOAD_EMPLOYEES: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromEmployees.LOAD_EMPLOYEES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromEmployees.LOAD_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
  }

  return state;
}

export const getEmployeesEntities = (state: EmployeeState) => state.entities;
export const getEmployeesLoading = (state: EmployeeState) => state.loading;
export const getEmployeesLoaded = (state: EmployeeState) => state.loaded;
