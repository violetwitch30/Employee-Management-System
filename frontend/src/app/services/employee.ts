import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  async getEmployees() {
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
              date_of_joining
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async addEmployee(employee: any) {
    const token = localStorage.getItem('token');

    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        query: `
          mutation {
            addEmployee(input: {
              first_name: "${employee.first_name}",
              last_name: "${employee.last_name}",
              email: "${employee.email}",
              gender: "${employee.gender}",
              designation: "${employee.designation}",
              salary: ${employee.salary},
              date_of_joining: "${employee.date_of_joining}",
              department: "${employee.department}"
            }) {
              id
              first_name
              last_name
              email
              designation
              department
              salary
              date_of_joining
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async deleteEmployee(id: string) {
    const token = localStorage.getItem('token');

    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          mutation {
            deleteEmployee(id: "${id}")
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async searchEmployees(search: string) {
    const token = localStorage.getItem('token');

    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        query: `
          query {
            searchEmployees(department: "${search}") {
              id
              first_name
              last_name
              email
              designation
              department
              salary
              date_of_joining
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async searchByDesignation(search: string) {
    const token = localStorage.getItem('token');

    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        query: `
          query {
            searchEmployees(designation: "${search}") {
              id
              first_name
              last_name
              email
              designation
              department
              salary
              date_of_joining
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async updateEmployee(id: string, employee: any) {
    const token = localStorage.getItem('token');

    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          mutation {
            updateEmployee(
              id: "${id}",
              input: {
                first_name: "${employee.first_name}",
                last_name: "${employee.last_name}",
                email: "${employee.email}",
                designation: "${employee.designation}",
                department: "${employee.department}",
                salary: ${employee.salary},
                date_of_joining: "${employee.date_of_joining}"
              }
            ) {
              id
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async getEmployee(id: string) {
    const token = localStorage.getItem('token');

    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        query: `
          query {
            employee(id: "${id}") {
              id
              first_name
              last_name
              email
              gender
              designation
              department
              salary
              date_of_joining
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }
}
