import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../../store/actions';
import * as fromUtils from '../../utils/time.utils';

import { Shift } from '../../models/shift.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'view-scheduling-container',
  template: `
    <div class="container">
      <h2>View Employees Scheduled For Selected Day</h2>

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

      <hr />

      <div class="mat-elevation-z2 p-2">
        <div class="p-2" *ngFor="let grouping of employeeShifts$ | async">
          {{ grouping.employee.lastName }}, {{ grouping.employee.firstName }}
          <div *ngFor="let shift of grouping.shifts">
            <div class="pt-0 pl-4 pb-0">
              {{ format(shift.start.toString()) }}
            </div>
            <div class="pt-0 pl-4 pb-0">{{ format(shift.end.toString()) }}</div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class ViewSchedulingContainerComponent implements OnInit {
  // note: defining types on the fly here seems to mess with webstorm's auto completion above
  employeeShifts$: Observable<{ employee: Employee; shifts: Shift[] }[]>;

  form = this.fb.group({
    day: new FormControl(new Date()),
  });

  constructor(
    private store: Store<fromStore.SchedulingState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.employeeShifts$ = this.store.select(
      fromStore.getEmployeesAndShiftsForDay()
    );

    this.form
      .get('day')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((date) => {
        this.store.dispatch(new fromActions.SetShiftDate(date));
      });
  }

  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }

  format = (date: string): string => fromUtils.getSimpleTimeFormat(date);
}
