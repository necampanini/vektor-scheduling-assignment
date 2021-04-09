import { Employee } from '../../models/employee.model';

import * as fromEmployees from '../actions';
import * as fromUtils from '../../../app/store/reducers/common-reducer.utils';

export interface EmployeesState
  extends fromUtils.BaseEntityInterface<Employee> {}

export const initialState: EmployeesState = {
  entities: {},
  loading: false,
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromEmployees.EmployeesAction
): EmployeesState {
  switch (action.type) {
    // load
    case fromEmployees.LOAD_EMPLOYEES: {
      return {
        ...state,
        loading: true,
        loaded: false,
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
      const entities = fromUtils.mapToEntity(action.payload, state.entities);

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }

    // create/update
    case fromEmployees.CREATE_EMPLOYEE_SUCCESS:
    case fromEmployees.UPDATE_EMPLOYEE_SUCCESS: {
      const employee = action.payload;
      const entities = {
        ...state.entities,
        [employee.id]: employee,
      };

      return {
        ...state,
        entities,
      };
    }

    case fromEmployees.REMOVE_EMPLOYEE_SUCCESS: {
      // uses destructuring to specify an entity, spread the rest to '...entities'
      const { [action.payload.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities,
      };
    }
  }

  return state;
}

export const getEmployeeEntities = (state: EmployeesState) => state.entities;
export const getEmployeesLoading = (state: EmployeesState) => state.loading;
export const getEmployeesLoaded = (state: EmployeesState) => state.loaded;
