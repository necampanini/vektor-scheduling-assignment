import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import * as fromUtils from '../../utils/time.utils';
import { Shift } from '../../models/shift.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'new-shift-form',
  templateUrl: 'new-shift-form.component.html',
  styleUrls: ['new-shift-form.component.scss'],
})
export class NewShiftFormComponent implements OnInit {
  @Input()
  employee: Employee;

  @Output()
  addShift: EventEmitter<Shift> = new EventEmitter<Shift>();

  hours = fromUtils.hoursSelect;
  minutes = fromUtils.minutesSelect;
  shiftStart: Date;
  shiftEnd: Date;

  form = this.fb.group({
    day: new FormControl(new Date()),
    startHour: new FormControl(6),
    startMinute: new FormControl(0),
    startPeriod: new FormControl('AM'),
    endHour: new FormControl(3),
    endMinute: new FormControl(0),
    endPeriod: new FormControl('PM'),
  });

  constructor(private fb: FormBuilder) {
    this.shiftStart = new Date();
    this.shiftStart.setHours(6);
    this.shiftStart.setMinutes(0);

    this.shiftEnd = new Date();
    this.shiftEnd.setHours(15);
    this.shiftEnd.setMinutes(0);
  }

  get canSubmit(): boolean {
    return this.shiftStart < this.shiftEnd;
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((next) => {
      const {
        day,
        startHour,
        startMinute,
        startPeriod,
        endHour,
        endMinute,
        endPeriod,
      } = next;
      // more possible abstraction possibilities - refraining for times sake
      const start = day;
      start.setHours(startPeriod == 'AM' ? startHour : startHour + 12);
      start.setMinutes(startMinute);
      this.shiftStart = new Date(start);

      const end = day;
      end.setHours(endPeriod == 'AM' ? endHour : endHour + 12);
      end.setMinutes(endMinute);
      this.shiftEnd = new Date(end);
    });
  }

  onSubmit = () => {
    this.addShift.emit({
      employeeId: this.employee.id,
      start: this.shiftStart,
      end: this.shiftEnd,
    } as Shift);
  };
}
