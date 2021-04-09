import { EmployeeListItemComponent } from './employee-list-item/employee-list-item.component';
import { NewShiftFormComponent } from './new-shift-form/new-shift-form.component';
import { EmployeeWeeklyScheduleComponent } from './employee-weekly-schedule/employee-weekly-schedule.component';
import { EmployeeWeeklyScheduleDailyShiftsComponent } from './employee-weekly-schedule-daily-shifts/employee-weekly-schedule-daily-shifts.component';

export const components: any[] = [
  EmployeeListItemComponent,
  NewShiftFormComponent,
  EmployeeWeeklyScheduleComponent,
  EmployeeWeeklyScheduleDailyShiftsComponent,
];

export * from './employee-list-item/employee-list-item.component';
export * from './new-shift-form/new-shift-form.component';
export * from './employee-weekly-schedule/employee-weekly-schedule.component';
export * from './employee-weekly-schedule-daily-shifts/employee-weekly-schedule-daily-shifts.component';
