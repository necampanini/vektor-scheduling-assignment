import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { Router } from '@angular/router';

import { TestBed } from '@angular/core/testing';

import { Employee } from '../../models/employee.model';
import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';

import * as fromSelectors from '../selectors/employees.selectors';
import { RouterTestingModule } from '@angular/router/testing';

class MockComponent {}

describe('Employees Selectors', () => {
  let store: Store<fromReducers.SchedulingState>;
  let router: Router;

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
        RouterTestingModule.withRoutes([
          {
            path: 'employee/:employeeId', component: MockComponent
          }
        ]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          scheduling: combineReducers(fromReducers.reducers)
        }),
        StoreRouterConnectingModule.forRoot({
          stateKey: 'router'
        })
      ]
    });

    // TODO: .get is deprecated, find latest best practice for testing Store
    store = TestBed.get(Store);
    router = TestBed.get(Router)
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

  // NOTE.NC: hard-coding what the router reducer would give back
  // Would ideally like to test selector for router state in conjunction with
  // entities (the selector of which works as intended)
  describe('getSelectedEmployee', () => {
    it('should return selected employee as an entity', () => {

      let result;
      // expected state after having navigated via router or routing action
      let routerState = {
        state: {
          url: 'employee/8ae2a281-1555-43fa-bb11-945b51cfdbb5',
          params: {employeeId: '8ae2a281-1555-43fa-bb11-945b51cfdbb5'},
          queryParams: {}
        }
      }

      store
        .select(fromSelectors.getEmployeesEntities)
        .subscribe(value => {
          return (result = value);
        })

      store.dispatch(new fromActions.LoadEmployeesSuccess(employees));

      expect(fromSelectors.getSelectedEmployee.projector(result, routerState))
        .toBe(entities['8ae2a281-1555-43fa-bb11-945b51cfdbb5']);
    });
  });

  describe('getAllEmployees', () => {
    it('should return employees as an array', () => {
      let result;

      store
        .select(fromSelectors.getAllEmployees)
        .subscribe(value => (result = value))

      expect(result).toEqual([])

      store.dispatch(new fromActions.LoadEmployeesSuccess(employees))

      expect(result).toEqual(employees)
    })
  })

  describe('getEmployeesLoaded', () => {
    it('should return the employees loaded state', () => {
      let result;

      store
        .select(fromSelectors.getEmployeesLoaded)
        .subscribe(value => (result = value))

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadEmployeesSuccess([]))

      expect(result).toEqual(true);
    })
  })

  describe('getEmployeesLoading', () => {
    it('should return the employees loading state', () => {
      let result;

      store
        .select(fromSelectors.getEmployeesLoading)
        .subscribe(value => (result = value))

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadEmployees())

      expect(result).toEqual(true);
    })
  });
});
