import { Component, Input } from '@angular/core';

@Component({
  selector: 'employee-weekly-schedule-daily-shifts',
  template: ``,
  styleUrls: ['employee-weekly-schedule-daily-shifts.component.scss'],
})
export class EmployeeWeeklyScheduleDailyShiftsComponent {
  @Input()
  dayItem: { key: string; day: string }; // presentation and grouping by key

  // @Input()
  // shiftEntity:
}
