import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.html',
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  signup() {
    this.authService.signup(this.username, this.email, this.password).then((response) => {
      console.log(response);

      if (response.data?.signup) {
        alert('Signup successful');
        this.router.navigate(['/']);
      } else {
        alert('Email already exists or invalid signup');
      }
    });
  }
}
