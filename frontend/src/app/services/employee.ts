import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  async getEmployees() {
    const token = localStorage.getItem('token');

    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
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
              gender
              designation
              department
              salary
              date_of_joining
              employee_photo
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async addEmployee(employee: any, file: File | null) {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    const operations = JSON.stringify({
      query: `
        mutation($input: EmployeeInput!, $file: Upload) {
          addEmployee(input: $input, file: $file) {
            id
            first_name
            last_name
            email
            gender
            designation
            department
            salary
            date_of_joining
            employee_photo
          }
        }
      `,
      variables: {
        input: {
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          gender: employee.gender,
          designation: employee.designation,
          salary: employee.salary,
          date_of_joining: employee.date_of_joining,
          department: employee.department,
          employee_photo: null,
        },
        file: null,
      },
    });

    formData.append('operations', operations);
    formData.append('map', JSON.stringify({ '0': ['variables.file'] }));

    if (file) {
      formData.append('0', file);
    }

    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    }).then((res) => res.json());
  }

  async deleteEmployee(id: string) {
    const token = localStorage.getItem('token');

    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
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

    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
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
              employee_photo
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async searchByDesignation(search: string) {
    const token = localStorage.getItem('token');

    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
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
              employee_photo
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  async updateEmployee(id: string, employee: any, file: File | null) {
    const token = localStorage.getItem('token');

    if (!file) {
      return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
                  gender: "${employee.gender}",
                  designation: "${employee.designation}",
                  department: "${employee.department}",
                  salary: ${employee.salary},
                  date_of_joining: "${employee.date_of_joining}"
                }
              ) {
                id
                first_name
                last_name
                email
                gender
                designation
                department
                salary
                date_of_joining
                employee_photo
              }
            }
          `,
        }),
      }).then((res) => res.json());
    }

    const formData = new FormData();

    const operations = JSON.stringify({
      query: `
        mutation($id: ID!, $input: UpdateEmployeeInput!, $file: Upload) {
          updateEmployee(id: $id, input: $input, file: $file) {
            id
            first_name
            last_name
            email
            gender
            designation
            department
            salary
            date_of_joining
            employee_photo
          }
        }
      `,
      variables: {
        id,
        input: {
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          gender: employee.gender,
          designation: employee.designation,
          department: employee.department,
          salary: employee.salary,
          date_of_joining: employee.date_of_joining,
        },
        file: null,
      },
    });

    formData.append('operations', operations);
    formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
    formData.append('0', file);

    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    }).then((res) => res.json());
  }

  async getEmployee(id: string) {
    const token = localStorage.getItem('token');

    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
              employee_photo
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }
}
