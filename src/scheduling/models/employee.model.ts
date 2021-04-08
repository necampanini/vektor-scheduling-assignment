export interface Employee {
  id: string;
  firstName: string;
  middleName?: string; // may or may not appear from 'db'
  lastName: string;
  employeeNumber: string;
  email?: string; // same as above comment
}
