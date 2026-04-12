import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string) {
    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query Login {
            login(input: {
              email: "${email}",
              password: "${password}"
            }) {
              token
              user {
                username
                email
              }
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }

  signup(username: string, email: string, password: string) {
    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation {
            signup(input: {
              username: "${username}",
              email: "${email}",
              password: "${password}"
            }) {
              id
              username
              email
            }
          }
        `,
      }),
    }).then((res) => res.json());
  }
}
