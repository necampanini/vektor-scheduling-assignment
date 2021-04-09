import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Employee } from '../../models/employee.model';
import { Shift } from '../../models/shift.model';

import * as fromRoot from '../../../app/store';
import * as fromStore from '../../store';

@Component({
  selector: 'employee-shift-container',
  template: `
    <div class="container">
      <div class="d-flex justify-content-center flex-column align-items-center">
        <h2>
          {{ (employee$ | async)?.lastName }},
          {{ (employee$ | async)?.firstName }}
        </h2>
        <h4>Emp #: {{ (employee$ | async)?.employeeNumber }}</h4>
        <button mat-stroked-button (click)="goBack()" class="mb-2">Back</button>
      </div>

      <new-shift-form
        [employee]="employee$ | async"
        (addShift)="onShiftAdd($event)"
      ></new-shift-form>

      <mat-divider class="mt-2"></mat-divider>

      <employee-weekly-schedule
        [shifts]="shifts$ | async"
      ></employee-weekly-schedule>
    </div>
  `,
  styleUrls: ['employee-shift-container.component.scss'],
})
export class EmployeeShiftContainerComponent implements OnInit {
  employee$: Observable<Employee>;
  shifts$: Observable<Shift[]>;

  constructor(private store: Store<fromStore.SchedulingState>) {}

  ngOnInit() {
    this.employee$ = this.store.select(fromStore.getSelectedEmployee);
    this.shifts$ = this.store.select(fromStore.getSelectedEmployeesShifts);
  }

  onShiftAdd = (shift: Shift) => {
    this.store.dispatch(new fromStore.CreateShift(shift));
  };

  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }
}
