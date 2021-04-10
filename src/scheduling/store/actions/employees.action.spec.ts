import * as fromEmployees from './employees.action';
import { Employee } from '../../models/employee.model';

describe('Employees Actions', () => {
  // LOAD
  describe('LoadEmployees Actions', () => {
    describe('LoadEmployees', () => {
      it('should create an action', () => {
        const action = new fromEmployees.LoadEmployees();

        expect({ ...action }).toEqual({
          type: fromEmployees.LOAD_EMPLOYEES,
        });
      });
    });

    describe('LoadEmployeesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'load error ' };
        const action = new fromEmployees.LoadEmployeesFail(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.LOAD_EMPLOYEES_FAIL,
          payload: payload,
        });
      });
    });

    describe('LoadEmployeesSuccess', () => {
      it('should create an action', () => {
        const payload: Employee[] = [
          {
            id: '788642c4-22c3-4931-b8bb-793368e01ac5',
            firstName: 'JohnTest',
            lastName: 'TestJohn',
            employeeNumber: '2384',
          },
          {
            id: 'a55feadb-24ea-4c99-bae1-46341437d2b9',
            firstName: 'JimmyTest',
            lastName: 'TestJimmy',
            employeeNumber: '5823',
          },
        ];
        const action = new fromEmployees.LoadEmployeesSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.LOAD_EMPLOYEES_SUCCESS,
          payload: payload,
        });
      });
    });
  });

  // CREATE
  describe('CreateEmployees Actions', () => {
    describe('CreateEmployee', () => {
      it('should create an action', () => {
        const payload: Employee = {
          id: '42b87145-e56f-4c5d-b5b0-d05ac6b0acb5',
          firstName: 'Sire',
          lastName: 'Denathrius',
          employeeNumber: '28472',
        };
        const action = new fromEmployees.CreateEmployee(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.CREATE_EMPLOYEE,
          payload,
        });
      });
    });

    describe('CreateEmployeeFail', () => {
      it('should create an action', () => {
        const payload = { message: 'create error ' };
        const action = new fromEmployees.CreateEmployeeFail(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.CREATE_EMPLOYEE_FAIL,
          payload: payload,
        });
      });
    });

    describe('CreateEmployeeSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: '42b87145-e56f-4c5d-b5b0-d05ac6b0acb5',
          firstName: 'Sire',
          lastName: 'Denathrius',
          employeeNumber: '28472',
        } as Employee;
        const action = new fromEmployees.CreateEmployeeSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.CREATE_EMPLOYEE_SUCCESS,
          payload: payload,
        });
      });
    });
  });

  // UPDATE
  describe('UpdateEmployees Actions', () => {
    describe('UpdateEmployee', () => {
      it('should create an action', () => {
        const payload: Employee = {
          id: '42b87145-e56f-4c5d-b5b0-d05ac6b0acb5',
          firstName: 'Sire',
          lastName: 'Denny',
          employeeNumber: '28472',
        };
        const action = new fromEmployees.UpdateEmployee(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.UPDATE_EMPLOYEE,
          payload,
        });
      });
    });

    describe('UpdateEmployeeFail', () => {
      it('should create an action', () => {
        const payload = { message: 'update error ' };
        const action = new fromEmployees.UpdateEmployeeFail(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.UPDATE_EMPLOYEE_FAIL,
          payload: payload,
        });
      });
    });

    describe('UpdateEmployeeSuccess', () => {
      it('should create an action', () => {
        const payload: Employee = {
          id: '42b87145-e56f-4c5d-b5b0-d05ac6b0acb5',
          firstName: 'Sire',
          lastName: 'Denny',
          employeeNumber: '28472',
        };
        const action = new fromEmployees.UpdateEmployeeSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.UPDATE_EMPLOYEE_SUCCESS,
          payload: payload,
        });
      });
    });
  });

  // REMOVE
  describe('RemoveEmployees Actions', () => {
    describe('RemoveEmployee', () => {
      it('should create an action', () => {
        const payload: Employee = {
          id: '42b87145-e56f-4c5d-b5b0-d05ac6b0acb5',
          firstName: 'Sire',
          lastName: 'Denny',
          employeeNumber: '28472',
        };
        const action = new fromEmployees.RemoveEmployee(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.REMOVE_EMPLOYEE,
          payload,
        });
      });
    });

    describe('RemoveEmployeeFail', () => {
      it('should create an action', () => {
        const payload = { message: 'remove error ' };
        const action = new fromEmployees.RemoveEmployeeFail(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.REMOVE_EMPLOYEE_FAIL,
          payload,
        });
      });
    });

    describe('RemoveEmployeeSuccess', () => {
      it('should create an action', () => {
        const payload: Employee = {
          id: '42b87145-e56f-4c5d-b5b0-d05ac6b0acb5',
          firstName: 'Sire',
          lastName: 'Denny',
          employeeNumber: '28472',
        };
        const action = new fromEmployees.RemoveEmployeeSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromEmployees.REMOVE_EMPLOYEE_SUCCESS,
          payload,
        });
      });
    });
  });
});
