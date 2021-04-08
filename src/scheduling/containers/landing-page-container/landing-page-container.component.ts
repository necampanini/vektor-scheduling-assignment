import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromReducers from '../../store/reducers'
import * as fromRoot from '../../../app/store'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'landing-page-container',
  template: `
    <div>
      <mat-grid-list cols="2" rowHeight="2:1">
        <mat-grid-tile>
          <mat-card>
            <mat-card-content>
              <h2>Add Employee</h2>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button (click)="routeTo('employees')">
                GO
              </button>
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

        <mat-grid-tile>
          <mat-card>
            <mat-card-content>
              <h3>Add Employee</h3>
            </mat-card-content>
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
  styleUrls: ['landing-page-container.component.scss']
})
export class LandingPageContainerComponent {

  constructor(private store: Store<fromReducers.SchedulingState>,
              private route: ActivatedRoute) {
  }

  routeTo(route: string) {
    this.store.dispatch(new fromRoot.Go({
      path: [`scheduling/${route}/new`],
      extras: {},
      query: {}
    }))
  }
}
