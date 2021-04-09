import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// routes
export const SchedulingRoutes: Routes = [
  {
    path: '',
    component: fromContainers.LandingPageContainerComponent,
  },
  {
    path: 'employees/new',
    component: fromContainers.AddEmployeeContainerComponent,
  },
  {
    path: 'employees',
    canActivate: [fromGuards.EmployeesGuard],
    component: fromContainers.EmployeeListContainerComponent,
  },
  {
    path: 'employees/:employeeId/shifts',
    canActivate: [fromGuards.EmployeeExistsGuard, fromGuards.ShiftsGuard],
    component: fromContainers.EmployeeShiftContainerComponent,
  },
  {
    path: 'by-day',
    canActivate: [fromGuards.EmployeesGuard, fromGuards.ShiftsGuard],
    component: fromContainers.ViewSchedulingContainerComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(SchedulingRoutes),
    StoreModule.forFeature('scheduling', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers],
})
export class SchedulingModule {}
