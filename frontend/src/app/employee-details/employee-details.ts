import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../services/employee';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-details.html',
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any = {};
  id = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    const cached = localStorage.getItem('employees');

    if (cached) {
      const employees = JSON.parse(cached);
      const found = employees.find((e: any) => e.id === this.id);

      if (found) {
        this.employee = found;
      }
    }

    this.employeeService.getEmployee(this.id).then((response) => {
      if (response.data?.employee) {
        this.employee = { ...response.data.employee };
        this.cdr.detectChanges();
      }
    });
  }
}
