import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromReducers from '../../store/reducers';
import * as fromRoot from '../../../app/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'landing-page-container',
  template: `
    <div class="d-flex justify-content-between">
      <!--      apologies for the lack of styling expertise -->
      <mat-card style="width: 50%;" class="m-4">
        <mat-card-header>
          <h2>Employees</h2>
        </mat-card-header>
        <mat-card-content> </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="routeTo('employees/new')">Create</button>
          <button mat-button (click)="routeTo('employees')">Manage</button>
        </mat-card-actions>
      </mat-card>

      <mat-card style="width: 50%;" class="m-4">
        <mat-card-header>
          <h2>Scheduling</h2>
        </mat-card-header>
        <mat-card-content> </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="routeTo('by-day')">By Day</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['landing-page-container.component.scss'],
})
export class LandingPageContainerComponent {
  constructor(
    private store: Store<fromReducers.SchedulingState>,
    private route: ActivatedRoute
  ) {}

  routeTo(route: string) {
    this.store.dispatch(
      new fromRoot.Go({
        path: [`scheduling/${route}`],
        extras: {},
        query: {},
      })
    );
  }
}
