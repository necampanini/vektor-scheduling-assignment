import { Action } from '@ngrx/store';

import { Shift } from '../../models/shift.model';

// load employees
export const LOAD_SHIFTS = '[Scheduling] Load Shifts';
export const LOAD_SHIFTS_FAIL = '[Scheduling] Load Shifts Fail';
export const LOAD_SHIFTS_SUCCESS = '[Scheduling] Load Shifts Success';

export class LoadShifts implements Action {
  readonly type = LOAD_SHIFTS;
}

export class LoadShiftsFail implements Action {
  readonly type = LOAD_SHIFTS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadShiftsSuccess implements Action {
  readonly type = LOAD_SHIFTS_SUCCESS;

  constructor(public payload: Shift[] = []) {
  }
}

// create
export const CREATE_SHIFT = '[Scheduling] Create Shift';
export const CREATE_SHIFT_FAIL = '[Scheduling] Create Shift Fail';
export const CREATE_SHIFT_SUCCESS = '[Scheduling] Create Shift Success';

export class CreateShift implements Action {
  readonly type = CREATE_SHIFT;
  constructor(public payload: Shift) {
  }
}

export class CreateShiftFail implements Action {
  readonly type = CREATE_SHIFT_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateShiftSuccess implements Action {
  readonly type = CREATE_SHIFT_SUCCESS;

  constructor(public payload: Shift) {
  }
}

// update
export const UPDATE_SHIFT = '[Scheduling] Update Shift';
export const UPDATE_SHIFT_FAIL = '[Scheduling] Update Shift Fail';
export const UPDATE_SHIFT_SUCCESS = '[Scheduling] Update Shift Success';

export class UpdateShift implements Action {
  readonly type = UPDATE_SHIFT;
  constructor(public payload: Shift) {
  }
}

export class UpdateShiftFail implements Action {
  readonly type = UPDATE_SHIFT_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateShiftSuccess implements Action {
  readonly type = UPDATE_SHIFT_SUCCESS;

  constructor(public payload: Shift) {
  }
}

// remove
export const REMOVE_SHIFT = '[Scheduling] Remove Shift';
export const REMOVE_SHIFT_FAIL = '[Scheduling] Remove Shift Fail';
export const REMOVE_SHIFT_SUCCESS = '[Scheduling] Remove Shift Success';

export class RemoveShift implements Action {
  readonly type = REMOVE_SHIFT;
  constructor(public payload: Shift) {
  }
}

export class RemoveShiftFail implements Action {
  readonly type = REMOVE_SHIFT_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveShiftSuccess implements Action {
  readonly type = REMOVE_SHIFT_SUCCESS;

  constructor(public payload: Shift) {
  }
}

export type ShiftsAction =
  LoadShifts
  | LoadShiftsFail
  | LoadShiftsSuccess
  | CreateShift
  | CreateShiftFail
  | CreateShiftSuccess
  | UpdateShift
  | UpdateShiftFail
  | UpdateShiftSuccess
  | RemoveShift
  | RemoveShiftFail
  | RemoveShiftSuccess;
