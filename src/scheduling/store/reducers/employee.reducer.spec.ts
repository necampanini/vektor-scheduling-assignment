import * as fromEmployees from './employees.reducer';
import * as employeeActions from '../actions/employees.action';
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

  // load actions
  describe('LOAD_EMPLOYEES action', () => {
    //
    it('should set loading to true', () => {
      const { initialState } = fromEmployees;
      const action = new employeeActions.LoadEmployees();
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
      const action = new employeeActions.LoadEmployeesSuccess(employees);
      const state = fromEmployees.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });
});
