import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import * as fromUtils from './time.utils';

@Component({
  selector: 'new-shift-form',
  templateUrl: 'new-shift-form.component.html',
  styleUrls: ['new-shift-form.component.scss'],
})
export class NewShiftFormComponent implements OnInit {
  hours = fromUtils.hoursSelect;
  minutes = fromUtils.minutesSelect;

  form = this.fb.group({
    day: new FormControl(new Date()),
    startHour: new FormControl(6),
    startMinute: new FormControl(0),
    startPeriod: new FormControl('AM'),
    endHour: new FormControl(3),
    endMinute: new FormControl(0),
    endPeriod: new FormControl('PM'),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((next) => {
      const { day, startHour, startMinute, startPeriod } = this.form.value;
      day.setHours(startPeriod == 'AM' ? startHour : startHour + 12);
      day.setMinutes(startMinute);

      console.log(new Date(day));
    });
  }
}
