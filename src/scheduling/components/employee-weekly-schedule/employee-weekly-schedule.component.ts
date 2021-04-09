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
        class="d-flex flex-column align-items-center justify-content-center border-light"
      >
        <h3>{{ day.day }}</h3>

        <ul>
          <li *ngFor="let shift of shiftEntities[day.key]">
            Start: {{ shift.start }}
          </li>
        </ul>
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
    console.log(this.currentWeek);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.shiftEntities = fromUtils.reduceShifts(this.shifts);
    console.log(this.shiftEntities);
  }
}
