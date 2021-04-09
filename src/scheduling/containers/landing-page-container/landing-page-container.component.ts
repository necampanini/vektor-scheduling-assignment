import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromReducers from '../../store/reducers';
import * as fromRoot from '../../../app/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'landing-page-container',
  template: `
    <div>
      <mat-grid-list cols="2" rowHeight="2:1">
        <mat-grid-tile>
          <mat-card>
            <mat-card-header>
              <h2>Employees</h2>
            </mat-card-header>
            <mat-card-content> </mat-card-content>
            <mat-card-actions>
              <button mat-button (click)="routeTo('employees/new')">
                Create
              </button>
              <button mat-button (click)="routeTo('employees')">Manage</button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card>
            <mat-card-content>
              <h3>Add Employee</h3>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
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
