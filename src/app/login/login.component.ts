// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = ''; // Clear previous error message
    this.authService.login(this.username, this.password, this.rememberMe)
      .subscribe(loggedIn => {
        if (loggedIn) {
          this.authService.isAdmin$().subscribe(isAdmin => {
            if (isAdmin) {
              this.router.navigate(['/administration-panel']); // Redirect to admin panel
            } else {
              this.router.navigate(['/home']); // Redirect to home for non-admin users
            }
          });
        } else {
          this.errorMessage = 'Invalid username or password'; // Show error message for invalid credentials
        }
      });
  }
}
