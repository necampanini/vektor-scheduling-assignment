import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';

import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';

@Component({
  selector: 'employee-list-container',
  template: `
    <div class="d-flex align-items-center flex-column">
      <h1>All Employees</h1>
      <button mat-stroked-button color="primary" (click)="goBack()">
        Back
      </button>
      <div
        class="d-flex justify-content-center flex-wrap employee-list-container"
      >
        <employee-list-item
          *ngFor="let employee of employees$ | async"
          class="list-item-container"
          [employee]="employee"
          (addShift)="onAddShiftNavigate($event)"
          (viewSchedule)="onViewScheduleNavigate($event)"
        >
        </employee-list-item>
      </div>
    </div>
  `,
  styleUrls: ['employee-list-container.component.scss'],
})
export class EmployeeListContainerComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private store: Store<fromStore.SchedulingState>) {}

  ngOnInit() {
    this.employees$ = this.store.select(fromStore.getAllEmployees);
  }

  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }

  onAddShiftNavigate(employeeId: string) {
    this.store.dispatch(
      new fromRoot.Go({
        path: ['scheduling/employees', employeeId, 'shifts'],
      })
    );
  }

  onViewScheduleNavigate(employeeId: string) {}
}
