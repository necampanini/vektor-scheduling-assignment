import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'employee-list-item',
  template: `
    <mat-card class="employee-card">
      <mat-card-header>
        <mat-card-title>
          {{ employee.lastName }}, {{ employee.firstName }}
        </mat-card-title>
      </mat-card-header>

      <mat-card-content class="pt-2">
        <div>
          <span class="employee-property">Employee #</span>:&nbsp;{{
            employee.employeeNumber
          }}
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>Add Shift</button>
        <button mat-button>View Schedule</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['employee-list-item.component.scss'],
})
export class EmployeeListItemComponent {
  @Input()
  employee: Employee;

  constructor() {}
}
