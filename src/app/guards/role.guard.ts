import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiredRoles = route.data['roles'] as string[]; // Use bracket notation to access 'roles'
    const userRoles = this.authService.getUserRoles(); // Get user's roles from AuthService

    // Check if the user has any of the required roles
    const hasRequiredRole = requiredRoles.some(
      (role) => (userRoles as unknown as string[]).indexOf(role) !== -1
    );

    if (hasRequiredRole) {
      return true; // User has required role, allow access
    } else {
      // Redirect to unauthorized page or login page
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
