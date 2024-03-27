import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      return true; // Allow access to the login page if user is not logged in
    } else {
      // User is already logged in, redirect to home page or any other page
      this.router.navigate(['/']); // Redirect to home page
      return false; // Deny access to the login page
    }
  }
}
