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
