import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // User is logged in, allow access to the route
    } else {
      // User is not logged in, redirect to login page
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Deny access to the route
    }
  }
}
