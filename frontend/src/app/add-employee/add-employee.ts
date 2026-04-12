import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-employee.html',
})
export class AddEmployeeComponent {
  employee = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: null as number | null,
    date_of_joining: '',
    department: '',
  };

  errors: any = {};

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  addEmployee() {
    this.errors = {};

    if (!this.employee.first_name) {
      this.errors.first_name = 'First name is required';
    }

    if (!this.employee.last_name) {
      this.errors.last_name = 'Last name is required';
    }

    if (!this.employee.email) {
      this.errors.email = 'Email is required';
    }

    if (this.employee.email && !this.employee.email.includes('@')) {
      this.errors.email = 'Invalid email';
    }

    if (!this.employee.gender) {
      this.errors.gender = 'Gender is required';
    }

    if (!this.employee.designation) {
      this.errors.designation = 'Designation is required';
    }

    if (!this.employee.salary) {
      this.errors.salary = 'Salary is required';
    } else if (this.employee.salary < 1000) {
      this.errors.salary = 'Salary must be at least 1000';
    }

    if (!this.employee.date_of_joining) {
      this.errors.date_of_joining = 'Date of joining is required';
    }

    if (!this.employee.department) {
      this.errors.department = 'Department is required';
    }

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    this.employeeService.addEmployee(this.employee).then((response) => {
      if (response.data?.addEmployee) {
        const cached = localStorage.getItem('employees');

        let employees = cached ? JSON.parse(cached) : [];

        employees.push(response.data.addEmployee);

        localStorage.setItem('employees', JSON.stringify(employees));

        this.router.navigate(['/employees']);
      }
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
