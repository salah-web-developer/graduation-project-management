// admin-auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin$()
      .pipe(
        take(1), // Take only one emission (current admin status)
        map((isAdmin: boolean) => {
          if (isAdmin) {
            return true; // User is admin, allow access to admin panel
          } else {
            // User is not an admin, redirect to home or other page
            this.router.navigate(['/home']);
            return false;
          }
        })
      );
  }
}
