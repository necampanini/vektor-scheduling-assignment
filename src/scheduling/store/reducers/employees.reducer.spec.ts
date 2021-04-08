import * as fromEmployees from './employees.reducer';
import * as fromActions from '../actions/employees.action';

import * as fromUtils from '../../../app/store/reducers/common-reducer.utils';

import { Employee } from '../../models/employee.model';

describe('Employee Reducer', () => {
  // undefined
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromEmployees;
      const action = {} as any;
      const state = fromEmployees.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  // load
  describe('LOAD_EMPLOYEES action', () => {
    //
    it('should set loading to true', () => {
      const { initialState } = fromEmployees;
      const action = new fromActions.LoadEmployees();
      const state = fromEmployees.reducer(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });

  describe('LOAD_EMPLOYEES_SUCCESS action', () => {
    it('should map an array to entities', () => {
      const employees: Employee[] = [
        { id: '788642c4-22c3-4931-b8bb-793368e01ac5', firstName: 'JohnTest', lastName: 'TestJohn', employeeNumber: 2384 },
        { id: 'a55feadb-24ea-4c99-bae1-46341437d2b9', firstName: 'JimmyTest', lastName: 'TestJimmy', employeeNumber: 5823 },
      ];

      const entities = {
        '788642c4-22c3-4931-b8bb-793368e01ac5': employees[0],
        'a55feadb-24ea-4c99-bae1-46341437d2b9': employees[1],
      };

      const { initialState } = fromEmployees;
      const action = new fromActions.LoadEmployeesSuccess(employees);
      const state = fromEmployees.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });

  describe('LOAD_EMPLOYEES_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromEmployees;
      const action = new fromActions.LoadEmployeesFail({});
      const state = fromEmployees.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const { initialState } = fromEmployees;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadEmployeesFail({});
      const state = fromEmployees.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  // create
  describe('CREATE_EMPLOYEE_SUCCESS action', () => {
    it('should add the new employee to the employees array/entity', () => {
      const employees: Employee[] = [
        {
          id: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          firstName: 'Johnny',
          lastName: 'Tester',
          employeeNumber: 8472
        },
        {
          id: '5ef131c4-d004-4732-b313-a2eb84dac7cf',
          firstName: 'Noah',
          lastName: 'Tested',
          employeeNumber: 8471
        }
      ];

      const newEmployee: Employee = {
        id: 'e062aa2d-d5de-48e8-b575-b01f52136899',
        firstName: 'Daft',
        lastName: 'Punk',
        employeeNumber: 8484
      };

      const entities = fromUtils.mapToEntity(employees, {});

      const { initialState } = fromEmployees;
      const previousState = { ...initialState, entities };
      const action = new fromActions.CreateEmployeeSuccess(newEmployee);
      const state = fromEmployees.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({
        ...entities,
        'e062aa2d-d5de-48e8-b575-b01f52136899': newEmployee
      });
    });
  });

  // update
  describe('UPDATE_EMPLOYEE_SUCCESS action', () => {
    it('should update the employee', () => {
      const employees: Employee[] = [
        {
          id: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          firstName: 'Johnny',
          lastName: 'Tester',
          employeeNumber: 8472
        },
        {
          id: '5ef131c4-d004-4732-b313-a2eb84dac7cf',
          firstName: 'Noah',
          lastName: 'Tested',
          employeeNumber: 8471
        }
      ];

      const updatedEmployee = {
        id: '5ef131c4-d004-4732-b313-a2eb84dac7cf',
        firstName: 'Noah',
        lastName: 'NewEmployeeNumber',
        employeeNumber: 6681
      };

      const entities = fromUtils.mapToEntity(employees, {});

      const { initialState } = fromEmployees;
      const previousState = { ...initialState, entities };
      const action = new fromActions.UpdateEmployeeSuccess(updatedEmployee);
      const state = fromEmployees.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({
        ...entities,
        '5ef131c4-d004-4732-b313-a2eb84dac7cf': updatedEmployee
      });
    });
  });

  //remove
  describe('REMOVE_EMPLOYEE_SUCCESS action', () => {
    it('should remove the employee', () => {
      const employees: Employee[] = [
        {
          id: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          firstName: 'Johnny',
          lastName: 'Tester',
          employeeNumber: 8472
        },
        {
          id: '5ef131c4-d004-4732-b313-a2eb84dac7cf',
          firstName: 'Noah',
          lastName: 'Tested',
          employeeNumber: 8471
        }
      ];

      const entities = fromUtils.mapToEntity(employees, {});

      const { initialState } = fromEmployees;
      const previousState = { ...initialState, entities };
      const action = new fromActions.RemoveEmployeeSuccess(employees[0]);
      const state = fromEmployees.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({
        '5ef131c4-d004-4732-b313-a2eb84dac7cf': employees[1]
      });
    });
  });
});

// reducer selectors
describe('EmployeesReducer Selectors', () => {
  describe('getEmployeeEntities', () => {
    it('should return .entities', () => {
      const entities: { [key: string]: Employee } = {
        '8ae2a281-1555-43fa-bb11-945b51cfdbb5': {
          id: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          firstName: 'Johnny',
          lastName: 'Tester',
          employeeNumber: 8472
        },
        '5ef131c4-d004-4732-b313-a2eb84dac7cf': {
          id: '5ef131c4-d004-4732-b313-a2eb84dac7cf',
          firstName: 'Noah',
          lastName: 'Tested',
          employeeNumber: 8471
        }
      };

      const { initialState } = fromEmployees;
      const previousState = {...initialState, entities }
      const slice = fromEmployees.getEmployeeEntities(previousState)

      expect(slice).toEqual(entities);
    });
  });

  describe('getEmployeesLoading', () => {
    it('should return .loading', () => {
      const { initialState } = fromEmployees;
      const previousState = { ...initialState, loading: true}
      const slice = fromEmployees.getEmployeesLoading(previousState);

      expect(slice).toEqual(true)
    });
  });

  describe('getEmployeesLoaded', () => {
    it('should return .loaded', () => {
      const { initialState } = fromEmployees;
      const previousState = { ...initialState, loaded: true };
      const slice = fromEmployees.getEmployeesLoaded(previousState);

      expect(slice).toEqual(true)
    })
  })
});
