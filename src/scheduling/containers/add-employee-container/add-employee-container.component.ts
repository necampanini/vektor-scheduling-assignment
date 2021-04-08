import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Employee } from '../../models/employee.model';

import * as fromReducers from '../../store/reducers';
import * as fromActions from '../../store/actions'
import * as fromSelectors from '../../store/selectors'


@Component({
  selector: 'add-employee-container',
  template: `
    <div class="mat-elevation-z4">
      <div class="p-4">
        <h2>Add Employee</h2>
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="add-employee-form">
          <mat-form-field appearance="fill" *ngFor="let val of lookup; let i = index;">
            <mat-label>{{val.label}}</mat-label>
            <input matInput [placeholder]="val.placeHolder || val.label" [formControlName]="val.formControlName"/>
          </mat-form-field>
          <button mat-stroked-button color="primary" type="submit" [disabled]="!canSubmit">
            Submit
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['add-employee-container.component.scss']
})
export class AddEmployeeContainerComponent {
  get canSubmit(): boolean {
    return this.form.valid;
  }

  loading$: Observable<boolean>

  form = this.fb.group({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    employeeNumber: new FormControl('', Validators.required),
    email: new FormControl('')
  });

  lookup = [
    { label: 'First Name', placeHolder: '', formControlName: 'firstName' },
    { label: 'Middle Name', placeHolder: '', formControlName: 'middleName' },
    { label: 'Last Name', placeHolder: '', formControlName: 'lastName' },
    { label: 'Employee #', placeHolder: '', formControlName: 'employeeNumber' },
    { label: 'Email', placeHolder: 'example@gmail.com', formControlName: 'email' },
  ];

  constructor(private fb: FormBuilder,
              private store: Store<fromReducers.SchedulingState>) {
  }

  onSubmit() {
    this.store.dispatch(new fromActions.CreateEmployee(this.form.value))
  }
}
