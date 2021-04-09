import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { Shift } from '../../models/shift.model';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'view-scheduling-container',
  template: `
    <div class="container">
      <h2>View Employees Scheduled For A Day</h2>

      <h4>
        <button mat-stroked-button color="primary" (click)="goBack()">
          Back
        </button>
      </h4>

      <div class="mat-elevation-z2 p-2">
        <form [formGroup]="form">
          <mat-form-field appearance="outline" class="mr-4 date-input">
            <mat-label>Day</mat-label>
            <input
              [matDatepicker]="dayDatePicker"
              formControlName="day"
              matInput
              readonly
            />
            <mat-datepicker-toggle
              [for]="dayDatePicker"
              matSuffix
            ></mat-datepicker-toggle>
            <mat-datepicker #dayDatePicker disabled="false"></mat-datepicker>
            <mat-hint>Please use calendar icon</mat-hint>
          </mat-form-field>
        </form>
      </div>

      <div>
        {{ (test$ | async)?.length }}
      </div>
    </div>
  `,
  styleUrls: [],
})
export class ViewSchedulingContainerComponent implements OnInit {
  employees$: Observable<Employee[]>;
  shifts$: Observable<Shift[]>;
  test$: Observable<any[]>;

  form = this.fb.group({
    day: new FormControl(new Date()),
  });

  constructor(
    private store: Store<fromStore.SchedulingState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.employees$ = this.store.select(fromStore.getAllEmployees);
    this.shifts$ = this.store.select(fromStore.getAllShifts);
    this.test$ = this.store.select(fromStore.getAllShiftsForDay(), {
      date: this.form.get('day').value,
    });
  }

  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }
}
