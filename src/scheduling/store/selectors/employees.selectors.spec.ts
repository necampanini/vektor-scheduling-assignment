import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';
import { Employee } from '../../models/employee.model';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from '../selectors/employees.selectors';
import { RouterStateUrl } from '../../../app/store';

describe('Employees Selectors', () => {
  let store: Store<fromReducers.SchedulingState>;

  const employee1: Employee = {
    id: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
    firstName: 'Johnny',
    lastName: 'Tester',
    employeeNumber: 8472
  };

  const employee2: Employee = {
    id: '73b7024f-962f-4fe8-962f-f61d1afbb9bd',
    firstName: 'Doom',
    lastName: 'Guy',
    employeeNumber: 8471
  };

  const employee3: Employee = {
    id: '8f49c882-32a6-4f49-9874-a8e3ecf8a1f1',
    firstName: 'Doom',
    lastName: 'Slayer',
    employeeNumber: 8470
  };

  const employees: Employee[] = [employee1, employee2, employee3];

  const entities = {
    '8ae2a281-1555-43fa-bb11-945b51cfdbb5': employees[0],
    '73b7024f-962f-4fe8-962f-f61d1afbb9bd': employees[1],
    '8f49c882-32a6-4f49-9874-a8e3ecf8a1f1': employees[2]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          scheduling: combineReducers(fromReducers.reducers)
        })
      ]
    });

    // TODO: .get is deprecated, find latest best practice for injecting Store
    store = TestBed.get(Store);
  });

  describe('getEmployeeState', () => {
    it('should return state of employee store slice', () => {
      let result;

      store
        .select(fromSelectors.getEmployeeState)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false
      });

      store.dispatch(new fromActions.LoadEmployeesSuccess(employees));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false
      });
    });
  });

  describe('getEmployeeEntities', () => {
    it('should return employees as entities', () => {
      let result;

      store
        .select(fromSelectors.getEmployeesEntities)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadEmployeesSuccess(employees));

      expect(result).toEqual(entities);
    });
  });

  // TODO: investigate how to test router state via selector
  // describe('getSelectedEmployee', () => {
  //   it('should return selected employee as an entity', () => {
  //
  //     let result;
  //     let params;
  //
  //     store.dispatch(new fromActions.LoadEmployeesSuccess(employees));
  //
  //     store.dispatch({
  //       type: fromRoot.GO,
  //       payload: {
  //         routerState: {
  //           url: '/scheduling',
  //           queryParams: {},
  //           params: { employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5' }
  //         },
  //         event: {},
  //       }
  //     });
  //
  //     // store
  //     //   .select(fromRoot.getRouterState)
  //     //   .subscribe(routerState => {
  //     //     console.log(routerState);
  //     //     return (params = routerState?.state.params);
  //     //   });
  //
  //     store
  //       .select(fromSelectors.getSelectedEmployee)
  //       .subscribe(selectedEmployee => (result = selectedEmployee));
  //
  //     expect(result).toEqual(entities['8ae2a281-1555-43fa-bb11-945b51cfdbb5']);
  //   });
  // });

});
