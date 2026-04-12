import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-employee.html',
})
export class EditEmployeeComponent implements OnInit {
  id = '';

  employee: any = {};

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    const cached = localStorage.getItem('employees');

    if (cached) {
      const employees = JSON.parse(cached);
      const found = employees.find((e: any) => e.id === this.id);

      if (found) {
        this.employee = {
          ...found,
          date_of_joining: found.date_of_joining?.split('T')[0],
        };
      }
    }

    this.employeeService.getEmployee(this.id).then((response) => {
      if (response.data?.employee) {
        this.employee = {
          ...response.data.employee,
          date_of_joining: response.data.employee.date_of_joining?.split('T')[0],
        };

        this.cdr.detectChanges();
      }
    });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee).then(() => {
      const cached = localStorage.getItem('employees');

      if (cached) {
        let employees = JSON.parse(cached);

        employees = employees.map((e: any) => (e.id === this.id ? { ...e, ...this.employee } : e));

        localStorage.setItem('employees', JSON.stringify(employees));
      }

      this.router.navigate(['/employees']);
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
