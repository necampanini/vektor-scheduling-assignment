import * as fromShifts from './shifts.reducer';
import * as fromActions from '../actions/shifts.action';

import * as fromUtils from '../../../app/store/reducers/common-reducer.utils';

import { Shift } from '../../models/shift.model';

describe('Shift Reducer', () => {
  // undefined
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromShifts;
      const action = {} as any;
      const state = fromShifts.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  // load
  describe('LOAD_SHIFTS action', () => {
    //
    it('should set loading to true', () => {
      const { initialState } = fromShifts;
      const action = new fromActions.LoadShifts();
      const state = fromShifts.reducer(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });

  describe('LOAD_SHIFTS_SUCCESS action', () => {
    it('should map an array to entities', () => {
      const shifts: Shift[] = [
        {
          id: '788642c4-22c3-4931-b8bb-793368e01ac5',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
        {
          id: 'a55feadb-24ea-4c99-bae1-46341437d2b9',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
      ];

      const entities = {
        '788642c4-22c3-4931-b8bb-793368e01ac5': shifts[0],
        'a55feadb-24ea-4c99-bae1-46341437d2b9': shifts[1],
      };

      const { initialState } = fromShifts;
      const action = new fromActions.LoadShiftsSuccess(shifts);
      const state = fromShifts.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });

  describe('LOAD_SHIFTS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromShifts;
      const action = new fromActions.LoadShiftsFail({});
      const state = fromShifts.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const { initialState } = fromShifts;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadShiftsFail({});
      const state = fromShifts.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  // create
  describe('CREATE_SHIFT_SUCCESS action', () => {
    it('should add the new shift to the shift array/entity', () => {
      const shifts: Shift[] = [
        {
          id: '788642c4-22c3-4931-b8bb-793368e01ac5',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
        {
          id: 'a55feadb-24ea-4c99-bae1-46341437d2b9',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
      ];

      const newShift: Shift = {
        id: 'dd8e96f3-cb08-44ff-8caa-4f377551d683',
        employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
        start: new Date(),
        end: new Date(),
      };

      const entities = fromUtils.mapToEntity(shifts, {});

      const { initialState } = fromShifts;
      const previousState = { ...initialState, entities };
      const action = new fromActions.CreateShiftSuccess(newShift);
      const state = fromShifts.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({
        ...entities,
        'dd8e96f3-cb08-44ff-8caa-4f377551d683': newShift,
      });
    });
  });

  // update
  describe('UPDATE_SHIFT_SUCCESS action', () => {
    it('should update the shift', () => {
      const shifts: Shift[] = [
        {
          id: '788642c4-22c3-4931-b8bb-793368e01ac5',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
        {
          id: 'a55feadb-24ea-4c99-bae1-46341437d2b9',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
      ];

      const updatedShift = {
        id: 'a55feadb-24ea-4c99-bae1-46341437d2b9',
        employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
        start: new Date(),
        end: new Date(),
      };

      const entities = fromUtils.mapToEntity(shifts, {});

      const { initialState } = fromShifts;
      const previousState = { ...initialState, entities };
      const action = new fromActions.UpdateShiftSuccess(updatedShift);
      const state = fromShifts.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({
        ...entities,
        'a55feadb-24ea-4c99-bae1-46341437d2b9': updatedShift,
      });
    });
  });

  //remove
  describe('REMOVE_SHIFT_SUCCESS action', () => {
    it('should remove the shift', () => {
      const shifts: Shift[] = [
        {
          id: '788642c4-22c3-4931-b8bb-793368e01ac5',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
        {
          id: 'a55feadb-24ea-4c99-bae1-46341437d2b9',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
      ];

      const entities = fromUtils.mapToEntity(shifts, {});

      const { initialState } = fromShifts;
      const previousState = { ...initialState, entities };
      const action = new fromActions.RemoveShiftSuccess(shifts[0]);
      const state = fromShifts.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({
        'a55feadb-24ea-4c99-bae1-46341437d2b9': shifts[1],
      });
    });
  });
});

// reducer selectors
describe('ShiftsReducer Selectors', () => {
  describe('getShiftEntities', () => {
    it('should return .entities', () => {
      const entities: { [key: string]: Shift } = {
        '788642c4-22c3-4931-b8bb-793368e01ac5': {
          id: '788642c4-22c3-4931-b8bb-793368e01ac5',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
        'a55feadb-24ea-4c99-bae1-46341437d2b9': {
          id: 'a55feadb-24ea-4c99-bae1-46341437d2b9',
          employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          start: new Date(),
          end: new Date(),
        },
      };

      const { initialState } = fromShifts;
      const previousState = { ...initialState, entities };
      const slice = fromShifts.getShiftEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe('getShiftsLoading', () => {
    it('should return .loading', () => {
      const { initialState } = fromShifts;
      const previousState = { ...initialState, loading: true };
      const slice = fromShifts.getShiftsLoading(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getShiftsLoaded', () => {
    it('should return .loaded', () => {
      const { initialState } = fromShifts;
      const previousState = { ...initialState, loaded: true };
      const slice = fromShifts.getShiftsLoaded(previousState);

      expect(slice).toEqual(true);
    });
  });
});
