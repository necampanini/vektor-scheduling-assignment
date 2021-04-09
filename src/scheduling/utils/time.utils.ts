import { DateTime } from 'luxon';
import { Shift } from '../models/shift.model';

export interface TimeSelect {
  value: number;
  display: string;
}

export const hoursSelect: TimeSelect[] = Array.from(range(1, 13, 1)).map(
  createTimeSelect
);

export const minutesSelect: TimeSelect[] = Array.from(range(0, 60, 1)).map(
  createTimeSelect
);

// helper display function for hour/minute selects
function createTimeSelect(i: number) {
  let x = i.toString();
  let display = x;
  if (x.length == 1) display = `0${i}`;

  return { value: i, display };
}

// taken from https://stackoverflow.com/a/39929661/3638143
function* range(start, end, step) {
  while (start < end) {
    yield start;
    start += step;
  }
}

export function getWeeklyView(week) {
  let x = DateTime.local().startOf('week');
  week.push({ day: 'Monday', key: x.toISO().slice(0, 10) });

  let days = [
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  for (let i = 1; i <= 6; i++) {
    let copy = x.plus({ day: i });
    week.push({
      day: days[i],
      key: copy.toISO().slice(0, 10),
    });
  }

  return week;
}

export function reduceShifts(
  shifts: Shift[]
  // entities: { key: string; shifts: Shift[] }
): { key: string; shifts: Shift[] } {
  // reducer function to return key/array pairs from:
  // https://edisondevadoss.medium.com/javascript-group-an-array-of-objects-by-key-afc85c35d07e

  // create key/value pairs of existing shifts using their dates as keys
  let shiftsByDay = shifts.map((shift) => {
    return {
      key: shift.start.toString().slice(0, 10),
      shift: shift,
    };
  });

  // using above array, create object with key/value pairs to match in 'currentWeek'
  return shiftsByDay.reduce(
    (entity: { key: string; shifts: Shift[] }, shiftByKey) => {
      entity[shiftByKey.key] = [
        ...(entity[shiftByKey.key] || []),
        shiftByKey.shift,
      ];
      return entity;
    },
    { key: null, shifts: [] } // workaround - cal
  );
}