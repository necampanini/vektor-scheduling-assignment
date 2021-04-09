import { EmployeesGuard } from './employees.guard';
import { EmployeeExistsGuard } from './employee-exists.guard';
import { ShiftsGuard } from './shifts.guard';

export const guards: any[] = [EmployeesGuard, EmployeeExistsGuard, ShiftsGuard];

export * from './employees.guard';
export * from './employee-exists.guard';
export * from './shifts.guard';
