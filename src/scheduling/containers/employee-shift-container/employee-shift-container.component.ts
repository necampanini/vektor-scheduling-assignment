import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Employee } from '../../models/employee.model';
import { Shift } from '../../models/shift.model';

import * as fromStore from '../../store';

@Component({
  selector: 'employee-shift-container',
  template: `
    <div class="container">
      <div class="d-flex justify-content-center">
        <h2>
          {{ (employee$ | async)?.lastName }},
          {{ (employee$ | async)?.firstName }}
        </h2>
      </div>

      <new-shift-form></new-shift-form>
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
}
