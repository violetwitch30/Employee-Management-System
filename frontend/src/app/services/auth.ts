import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string) {
    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
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
    return fetch('https://101504996-comp3133-assignment2-back.vercel.app/graphql', {
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
