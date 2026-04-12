import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  login() {
    this.authService.login(this.email, this.password).then((response) => {
      console.log(response);

      if (response.data?.login?.token) {
        localStorage.setItem('token', response.data.login.token);
        this.router.navigate(['/employees']);
      } else {
        alert(JSON.stringify(response));
      }
    });
  }
}
