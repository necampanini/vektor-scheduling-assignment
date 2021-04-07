import { Action } from '@ngrx/store';

import { Employee } from '../../models/employee.model';

// load employees
export const LOAD_EMPLOYEES = '[Scheduling] Load Employees';
export const LOAD_EMPLOYEES_FAIL = '[Scheduling] Load Employees Fail';
export const LOAD_EMPLOYEES_SUCCESS = '[Scheduling] Load Employees Success';

export class LoadEmployees implements Action {
  readonly type = LOAD_EMPLOYEES;
}

export class LoadEmployeesFail implements Action {
  readonly type = LOAD_EMPLOYEES_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadEmployeesSuccess implements Action {
  readonly type = LOAD_EMPLOYEES_SUCCESS;

  constructor(public payload: Employee[] = []) {
  }
}

// create
export const CREATE_EMPLOYEE = '[Scheduling] Create Employee';
export const CREATE_EMPLOYEE_FAIL = '[Scheduling] Create Employee Fail';
export const CREATE_EMPLOYEE_SUCCESS = '[Scheduling] Create Employee Success';

export class CreateEmployee implements Action {
  readonly type = CREATE_EMPLOYEE;
}

export class CreateEmployeeFail implements Action {
  readonly type = CREATE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateEmployeeSuccess implements Action {
  readonly type = CREATE_EMPLOYEE_SUCCESS;

  constructor(public payload: Employee) {
  }
}

// update
export const UPDATE_EMPLOYEE = '[Scheduling] Update Employee';
export const UPDATE_EMPLOYEE_FAIL = '[Scheduling] Update Employee Fail';
export const UPDATE_EMPLOYEE_SUCCESS = '[Scheduling] Update Employee Success';

export class UpdateEmployee implements Action {
  readonly type = UPDATE_EMPLOYEE;
}

export class UpdateEmployeeFail implements Action {
  readonly type = UPDATE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateEmployeeSuccess implements Action {
  readonly type = UPDATE_EMPLOYEE_SUCCESS;

  constructor(public payload: Employee) {
  }
}

// remove
export const REMOVE_EMPLOYEE = '[Scheduling] Remove Employee';
export const REMOVE_EMPLOYEE_FAIL = '[Scheduling] Remove Employee Fail';
export const REMOVE_EMPLOYEE_SUCCESS = '[Scheduling] Remove Employee Success';

export class RemoveEmployee implements Action {
  readonly type = REMOVE_EMPLOYEE;
}

export class RemoveEmployeeFail implements Action {
  readonly type = REMOVE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveEmployeeSuccess implements Action {
  readonly type = REMOVE_EMPLOYEE_SUCCESS;

  constructor(public payload: Employee) {
  }
}

export type EmployeesAction =
  LoadEmployees
  | LoadEmployeesFail
  | LoadEmployeesSuccess
  | CreateEmployee
  | CreateEmployeeFail
  | CreateEmployeeSuccess
  | UpdateEmployee
  | UpdateEmployeeFail
  | UpdateEmployeeSuccess
  | RemoveEmployee
  | RemoveEmployeeFail
  | RemoveEmployeeSuccess;
