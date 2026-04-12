import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employees.html',
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  searchText = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    const cached = localStorage.getItem('employees');

    if (cached) {
      this.employees = JSON.parse(cached);
      this.cdr.detectChanges();
    }

    this.employeeService.getEmployees().then((response) => {
      if (response.data?.employees) {
        this.employees = [...response.data.employees];

        localStorage.setItem('employees', JSON.stringify(this.employees));

        this.cdr.detectChanges();
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('employees');
    this.router.navigate(['/']);
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).then((response) => {
      if (response.data?.deleteEmployee) {
        this.employees = this.employees.filter((e) => e.id !== id);

        localStorage.setItem('employees', JSON.stringify(this.employees));

        this.cdr.detectChanges();
      }
    });
  }

  search() {
    if (this.searchText.trim() === '') {
      this.loadEmployees();
      return;
    }

    this.employeeService.searchEmployees(this.searchText).then((response) => {
      if (response.data?.searchEmployees?.length > 0) {
        this.employees = response.data.searchEmployees;
        this.cdr.detectChanges();
      } else {
        this.employeeService.searchByDesignation(this.searchText).then((response2) => {
          if (response2.data?.searchEmployees) {
            this.employees = response2.data.searchEmployees;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }
}
