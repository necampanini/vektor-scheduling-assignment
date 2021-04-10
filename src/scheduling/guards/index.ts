import { EmployeesGuard } from './employees.guard';
import { EmployeeExistsGuard } from './employee-exists.guard';
import { ShiftsGuard } from './shifts.guard';
import { SelectedDateGuard } from './selected-date.guard';

export const guards: any[] = [
  EmployeesGuard,
  EmployeeExistsGuard,
  ShiftsGuard,
  SelectedDateGuard,
];

export * from './employees.guard';
export * from './employee-exists.guard';
export * from './shifts.guard';
export * from './selected-date.guard';
