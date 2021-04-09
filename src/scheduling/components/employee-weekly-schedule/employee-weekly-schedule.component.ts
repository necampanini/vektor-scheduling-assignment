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
    <div class="container mat-elevation-z2 d-flex justify-content-around">
      <div
        *ngFor="let day of currentWeek"
        class="d-flex flex-column align-items-center border-light"
      >
        <h3>{{ day.day }}</h3>

        <div *ngFor="let shift of shiftEntities[day.key]">
          <div>
            {{ getTime(shift.start) }}
          </div>
          <div>
            {{ getTime(shift.end) }}
          </div>
          <hr />
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

  getTime(start: string): string {
    let date = new Date(start);
    // lifted from: https://stackoverflow.com/a/20430558/3638143
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
