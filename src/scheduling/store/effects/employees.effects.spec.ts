import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { cold, hot } from 'jasmine-marbles';
import { empty, Observable, of } from 'rxjs';

import { EmployeesService } from '../../services/';
import * as fromEffects from './employees.effect';
import * as fromActions from '../actions/employees.action';
import { Employee } from '../../models/employee.model';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('EmployeesEffects', () => {
  let actions$: TestActions;
  let service: EmployeesService;
  let effects: fromEffects.EmployeesEffects;

  const employee1: Employee = {
    id: '8ae2a281-1555-43fa-bb11-945b51cfdbb5',
    firstName: 'Johnny',
    lastName: 'Tester',
    employeeNumber: '8472',
  };

  const employee2: Employee = {
    id: '73b7024f-962f-4fe8-962f-f61d1afbb9bd',
    firstName: 'Doom',
    lastName: 'Guy',
    employeeNumber: '8471',
  };

  const employees: Employee[] = [employee1, employee2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeesService,
        fromEffects.EmployeesEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(EmployeesService);
    effects = TestBed.get(fromEffects.EmployeesEffects);

    spyOn(service, 'getEmployees').and.returnValue(of(employees));
    spyOn(service, 'createEmployee').and.returnValue(of(employees[0]));
    spyOn(service, 'updateEmployee').and.returnValue(of(employees[0]));
    spyOn(service, 'removeEmployee').and.returnValue(of(employees[0]));
  });

  describe('loadEmployees$', () => {
    it('should return a collection from LoadEmployeesSuccess', () => {
      const action = new fromActions.LoadEmployees();
      const completion = new fromActions.LoadEmployeesSuccess(employees);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadEmployees$).toBeObservable(expected);
    });
  });

  describe('createEmployee$', () => {
    it('should work', () => {
      const action = new fromActions.CreateEmployee(employees[0]);
      const completion = new fromActions.CreateEmployeeSuccess(employees[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createEmployee$).toBeObservable(expected);
    });
  });

  describe('updateEmployee$', () => {
    it('should work', () => {
      const action = new fromActions.UpdateEmployee(employees[0]);
      const completion = new fromActions.UpdateEmployeeSuccess(employees[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.updateEmployee$).toBeObservable(expected);
    });
  });

  describe('removeEmployee$', () => {
    it('should work', () => {
      const action = new fromActions.RemoveEmployee(employees[0]);
      const completion = new fromActions.RemoveEmployeeSuccess(employees[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removeEmployee$).toBeObservable(expected);
    });
  });
});
