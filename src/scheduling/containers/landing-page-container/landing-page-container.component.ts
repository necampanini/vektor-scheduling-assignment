import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromReducers from '../../store/reducers';
import * as fromRoot from '../../../app/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'landing-page-container',
  template: `
    <div>
      <!--      apologies for the lack of styling expertise -->
      <mat-card style="width: 25%; margin: auto">
        <mat-card-header>
          <h2>Employees</h2>
        </mat-card-header>
        <mat-card-content> </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="routeTo('employees/new')">Create</button>
          <button mat-button (click)="routeTo('employees')">Manage</button>
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
