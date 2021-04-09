import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'employee-list-container',
  template: `
    <div class="d-flex align-items-center flex-column">
      <h1>All Employees</h1>

      <div
        class="d-flex justify-content-center flex-wrap employee-list-container"
      >
        <employee-list-item
          *ngFor="let employee of employees$ | async"
          class="list-item-container"
          [employee]="employee"
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
}
