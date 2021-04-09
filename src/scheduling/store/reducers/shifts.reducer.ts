import { Shift } from '../../models/shift.model';

import * as fromShifts from '../actions';
import * as fromUtils from '../../../app/store/reducers/common-reducer.utils';

export interface ShiftsState extends fromUtils.BaseEntityInterface<Shift> {
}

export const initialState: ShiftsState = {
  entities: {},
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: fromShifts.ShiftsAction): ShiftsState {
  switch (action.type) {
    // load
    case fromShifts.LOAD_SHIFTS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromShifts.LOAD_SHIFTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromShifts.LOAD_SHIFTS_SUCCESS: {
      const entities = fromUtils.mapToEntity(action.payload, state.entities);

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    // create/update
    case fromShifts.CREATE_SHIFT_SUCCESS:
    case fromShifts.UPDATE_SHIFT_SUCCESS: {
      const shift = action.payload;
      const entities = {
        ...state.entities,
        [shift.id]: shift
      };

      return {
        ...state,
        entities
      };
    }

    case fromShifts.REMOVE_SHIFT_SUCCESS: {
      const { [action.payload.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getShiftEntities = (state: ShiftsState) => state.entities;
export const getShiftsLoading = (state: ShiftsState) => state.loading;
export const getShiftsLoaded = (state: ShiftsState) => state.loaded;
