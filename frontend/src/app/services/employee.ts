import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getEmployees() {
    const token = localStorage.getItem('token');

    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query {
            employees {
              id
              first_name
              last_name
              email
              designation
              department
              salary
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }
}
