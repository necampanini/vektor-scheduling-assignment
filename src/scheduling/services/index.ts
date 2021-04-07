import { ShiftsService } from './shifts.service';
import { EmployeesService } from './employees.service';

export const services: any[] = [ShiftsService, EmployeesService];

export * from './shifts.service';
export * from './employees.service';
