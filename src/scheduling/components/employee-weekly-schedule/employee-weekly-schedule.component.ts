import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { Shift } from '../../models/shift.model';

import * as fromUtils from '../../utils';

@Component({
  selector: 'employee-weekly-schedule',
  template: `
    <div class="mat-elevation-z2 p-4">
      <h2>Current Week</h2>
      <div class="container  d-flex justify-content-around">
        <div
          *ngFor="let day of currentWeek"
          class="d-flex flex-column align-items-center border-light pt-2"
        >
          <h3>{{ day.day }}</h3>

          <div *ngFor="let shift of shiftEntities[day.key]">
            <div>
              {{ format(shift.start) }}
            </div>
            <div>
              {{ format(shift.end) }}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['employee-weekly-schedule.component.scss'],
})
export class EmployeeWeeklyScheduleComponent implements OnChanges, OnInit {
  @Input()
  shifts: Shift[];

  currentWeek: { key: string; day: string }[] = [];
  shiftEntities: { key: string; shifts: Shift[] };

  constructor() {}

  ngOnInit() {
    // in the interest of time manual week/date calculation to get the current week delegated to luxon
    this.currentWeek = fromUtils.getWeeklyView(this.currentWeek);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.shiftEntities = fromUtils.reduceShifts(this.shifts);
  }

  format(dateString: string): string {
    return fromUtils.getSimpleTimeFormat(dateString);
  }
}
