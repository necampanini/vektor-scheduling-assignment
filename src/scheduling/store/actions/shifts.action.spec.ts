import * as fromShifts from './shifts.action';
import { Shift } from '../../models/shift.model';

describe('Shifts Actions', () => {
  // LOAD
  describe('LoadShifts Actions', () => {
    describe('LoadShifts', () => {
      it('should create an action', () => {
        const action = new fromShifts.LoadShifts();

        expect({ ...action }).toEqual({
          type: fromShifts.LOAD_SHIFTS,
        });
      });
    });

    describe('LoadShiftsFail', () => {
      it('should create an action', () => {
        const payload = { message: 'load error ' };
        const action = new fromShifts.LoadShiftsFail(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.LOAD_SHIFTS_FAIL,
          payload: payload,
        });
      });
    });

    describe('LoadShiftsSuccess', () => {
      it('should create an action', () => {
        const payload: Shift[] = [
          {
            id: '32a36eb7-3571-4784-927a-c1d608019576',
            employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
            start: new Date('01 Mar 2021 00:00:00 GMT'),
            end: new Date('01 Mar 2021 06:00:00 GMT'),
          },
          {
            id: '83bc6c24-201f-44bc-93e8-3d5c1d90f8b5',
            employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
            start: new Date('02 Mar 2021 00:00:00 GMT'),
            end: new Date('02 Mar 2021 06:00:00 GMT'),
          },
        ];
        const action = new fromShifts.LoadShiftsSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.LOAD_SHIFTS_SUCCESS,
          payload: payload,
        });
      });
    });
  });

  // CREATE
  describe('CreateShifts Actions', () => {
    describe('CreateShift', () => {
      it('should create an action', () => {
        const payload: Shift = {
          id: 'c96627cd-be56-4a76-aa0b-d6f9e664d531',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date('01 Mar 2021 00:00:00 GMT'),
          end: new Date('01 Mar 2021 06:00:00 GMT'),
        };
        const action = new fromShifts.CreateShift(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.CREATE_SHIFT,
          payload,
        });
      });
    });

    describe('CreateShiftFail', () => {
      it('should create an action', () => {
        const payload = { message: 'create error ' };
        const action = new fromShifts.CreateShiftFail(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.CREATE_SHIFT_FAIL,
          payload: payload,
        });
      });
    });

    describe('CreateShiftSuccess', () => {
      it('should create an action', () => {
        const payload: Shift = {
          id: 'c96627cd-be56-4a76-aa0b-d6f9e664d531',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date('01 Mar 2021 00:00:00 GMT'),
          end: new Date('01 Mar 2021 06:00:00 GMT'),
        };
        const action = new fromShifts.CreateShiftSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.CREATE_SHIFT_SUCCESS,
          payload: payload,
        });
      });
    });
  });

  // UPDATE
  describe('UpdateShifts Actions', () => {
    describe('UpdateShift', () => {
      it('should create an action', () => {
        const payload: Shift = {
          id: 'c96627cd-be56-4a76-aa0b-d6f9e664d531',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date('01 Mar 2021 00:00:00 GMT'),
          end: new Date('01 Mar 2021 06:00:00 GMT'),
        };
        const action = new fromShifts.UpdateShift(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.UPDATE_SHIFT,
          payload,
        });
      });
    });

    describe('UpdateShiftFail', () => {
      it('should create an action', () => {
        const payload = { message: 'update error ' };
        const action = new fromShifts.UpdateShiftFail(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.UPDATE_SHIFT_FAIL,
          payload: payload,
        });
      });
    });

    describe('UpdateShiftSuccess', () => {
      it('should create an action', () => {
        const payload: Shift = {
          id: 'c96627cd-be56-4a76-aa0b-d6f9e664d531',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date('01 Mar 2021 00:00:00 GMT'),
          end: new Date('01 Mar 2021 06:00:00 GMT'),
        };
        const action = new fromShifts.UpdateShiftSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.UPDATE_SHIFT_SUCCESS,
          payload: payload,
        });
      });
    });
  });

  // REMOVE
  describe('RemoveShifts Actions', () => {
    describe('RemoveShift', () => {
      it('should create an action', () => {
        const payload: Shift = {
          id: 'c96627cd-be56-4a76-aa0b-d6f9e664d531',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date('01 Mar 2021 00:00:00 GMT'),
          end: new Date('01 Mar 2021 06:00:00 GMT'),
        };
        const action = new fromShifts.RemoveShift(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.REMOVE_SHIFT,
          payload,
        });
      });
    });

    describe('RemoveShiftFail', () => {
      it('should create an action', () => {
        const payload = { message: 'remove error ' };
        const action = new fromShifts.RemoveShiftFail(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.REMOVE_SHIFT_FAIL,
          payload,
        });
      });
    });

    describe('RemoveShiftSuccess', () => {
      it('should create an action', () => {
        const payload: Shift = {
          id: 'c96627cd-be56-4a76-aa0b-d6f9e664d531',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date('01 Mar 2021 00:00:00 GMT'),
          end: new Date('01 Mar 2021 06:00:00 GMT'),
        };
        const action = new fromShifts.RemoveShiftSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromShifts.REMOVE_SHIFT_SUCCESS,
          payload,
        });
      });
    });
  });
});
