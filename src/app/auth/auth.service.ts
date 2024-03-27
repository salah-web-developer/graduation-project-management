// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserRoles() {
    throw new Error('Method not implemented.');
  }
  private usersUrl = 'assets/users.json'; // Path to the JSON file
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(username: string, password: string, rememberMe: boolean): Observable<boolean> {
    return this.http.get<any>(this.usersUrl)
      .pipe(
        map(users => {
          const user = users.users.find((u: { username: string; password: string; }) => u.username === username && u.password === password);
          if (user) {
            this.loggedIn.next(true); // Update authentication state
            // Store authentication state based on rememberMe flag
            if (rememberMe) {
              localStorage.setItem('isLoggedIn', 'true');
            } else {
              sessionStorage.setItem('isLoggedIn', 'true');
            }
            // Store username in localStorage for use in other parts of the application
            localStorage.setItem('username', username);
            return true; // Return true for successful login
          } else {
            this.loggedIn.next(false); // Update authentication state
            localStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            return false; // Return false for unsuccessful login
          }
        })
      );
  }

  logout(): void {
    this.loggedIn.next(false); // Update authentication state
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    const isLoggedInLocal = localStorage.getItem('isLoggedIn');
    const isLoggedInSession = sessionStorage.getItem('isLoggedIn');
    return isLoggedInLocal === 'true' || isLoggedInSession === 'true';
  }

  // Get current authentication state as observable
  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Check if the user is an admin
  isAdmin$(): Observable<boolean> {
    const username = localStorage.getItem('username');
    if (!username) {
      return new Observable<boolean>(observer => {
        observer.next(false); // No user logged in, not an admin
        observer.complete();
      });
    }

    return this.http.get<any>(this.usersUrl)
      .pipe(
        map(users => {
          const user = users.users.find((u: { username: string; role: string; }) => u.username === username);
          return user?.role === 'Administrator';
        })
      );
  }
}
