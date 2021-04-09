import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'employee-list-item',
  template: `
    <mat-card class="employee-card">
      <mat-card-header>
        <div mat-card-avatar>
          <span class="material-icons"> people </span>
        </div>
        <mat-card-title>
          {{ employee.lastName }}, {{ employee.firstName }}
        </mat-card-title>
      </mat-card-header>

      <mat-card-content class="pt-2">
        <div>
          <span class="employee-property">Middle Name</span>:&nbsp;
          {{ employee.middleName || 'N/A' }}
        </div>
        <div>
          <span class="employee-property">Employee #</span>:&nbsp;
          {{ employee.employeeNumber }}
        </div>
        <div>
          <span class="employee-property">Email</span>:&nbsp;
          {{ employee.email || 'N/A' }}
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-stroked-button (click)="route('addShift')">
          Manage/View Shifts
        </button>
        <!--        <button mat-stroked-button (click)="route('viewSchedule')">-->
        <!--          View Schedule-->
        <!--        </button>-->
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['employee-list-item.component.scss'],
})
export class EmployeeListItemComponent {
  @Input()
  employee: Employee;

  @Output()
  addShift: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  viewSchedule: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  route(outputName: string) {
    this[outputName].emit(this.employee.id);
  }
}
