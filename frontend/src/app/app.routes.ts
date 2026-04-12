import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { EmployeesComponent } from './employees/employees';
import { AddEmployeeComponent } from './add-employee/add-employee';
import { EditEmployeeComponent } from './edit-employee/edit-employee';
import { EmployeeDetailsComponent } from './employee-details/employee-details';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'edit/:id', component: EditEmployeeComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
];
