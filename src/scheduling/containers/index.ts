import { LandingPageContainerComponent } from './landing-page-container/landing-page-container.component';
import { AddEmployeeContainerComponent } from './add-employee-container/add-employee-container.component';
import { EmployeeListContainerComponent } from './employee-list-container/employee-list-container.component';
import { EmployeeShiftContainerComponent } from './employee-shift-container/employee-shift-container.component';
import { ViewSchedulingContainerComponent } from './view-scheduling-container/view-scheduling-container.component';

export const containers: any[] = [
  LandingPageContainerComponent,
  AddEmployeeContainerComponent,
  EmployeeListContainerComponent,
  EmployeeShiftContainerComponent,
  ViewSchedulingContainerComponent,
];

export * from './landing-page-container/landing-page-container.component';
export * from './add-employee-container/add-employee-container.component';
export * from './employee-list-container/employee-list-container.component';
export * from './employee-shift-container/employee-shift-container.component';
export * from './view-scheduling-container/view-scheduling-container.component';
