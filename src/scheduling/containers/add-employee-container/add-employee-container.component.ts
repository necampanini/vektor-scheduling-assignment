import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as fromReducers from '../../store/reducers';
import * as fromActions from '../../store/actions';
import * as fromRoot from '../../../app/store';

@Component({
  selector: 'add-employee-container',
  template: `
    <div class="mat-elevation-z4">
      <div class="p-4">
        <h2>Add Employee</h2>
        <form
          #f="ngForm"
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="add-employee-form"
        >
          <mat-form-field
            appearance="fill"
            *ngFor="let val of lookup; let i = index"
          >
            <mat-label>{{ val.label }}</mat-label>
            <input
              matInput
              [placeholder]="val.placeHolder || val.label"
              [formControlName]="val.formControlName"
            />
          </mat-form-field>
          <div>
            <button
              mat-stroked-button
              color="primary"
              type="submit"
              class="mr-2"
              [disabled]="!canSubmit"
            >
              Submit
            </button>
            <button
              mat-stroked-button
              color="accent"
              type="button"
              (click)="goBack()"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['add-employee-container.component.scss'],
})
export class AddEmployeeContainerComponent {
  form = this.fb.group({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    employeeNumber: new FormControl('', Validators.required),
    email: new FormControl(''),
  });

  // avoiding duplicate code
  lookup = [
    { label: 'First Name', placeHolder: '', formControlName: 'firstName' },
    { label: 'Middle Name', placeHolder: '', formControlName: 'middleName' },
    { label: 'Last Name', placeHolder: '', formControlName: 'lastName' },
    { label: 'Employee #', placeHolder: '', formControlName: 'employeeNumber' },
    {
      label: 'Email',
      placeHolder: 'example@gmail.com',
      formControlName: 'email',
    },
  ];

  @ViewChild('f') formViewChild;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromReducers.SchedulingState>,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) {
    // listen for successful creates
    actions$
      .pipe(
        ofType<fromActions.CreateEmployeeSuccess>(
          fromActions.CREATE_EMPLOYEE_SUCCESS
        )
      )
      .subscribe((next) => {
        // reset form and notify
        this.formViewChild.resetForm();

        this.snackBar.open(
          `${next.payload.lastName}, ${next.payload.firstName} entered into system!`,
          'Dismiss',
          {
            duration: 3500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      });
  }

  get canSubmit(): boolean {
    return this.form.valid; // other values as necessary
  }

  onSubmit() {
    this.store.dispatch(new fromActions.CreateEmployee(this.form.value));
  }

  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }
}
