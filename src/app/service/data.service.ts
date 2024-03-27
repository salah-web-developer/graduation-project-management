import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersUrl = 'assets/users.json'; // Path to the JSON file

  constructor(private http: HttpClient) {}

  getUsersData(): Observable<any[]> {
    return this.http.get<any>(this.usersUrl).pipe(
      catchError(error => {
        console.error('Error fetching users data:', error);
        return of([]); // Return an empty array on error
      }),
      map(response => {
        // Check if the response contains a 'users' property and it's an array
        if (Array.isArray(response?.users)) {
          return response.users; // Return the 'users' array
        } else {
          console.error('Users data is not an array:', response);
          return []; // Return an empty array if 'users' array is not found
        }
      })
    );
  }

  getRolesData(): Observable<{ role: string; count: number }[]> {
    return this.getUsersData().pipe(
      map(users => {
        // Extract roles and count the number of users in each role
        const rolesMap = new Map<string, number>();
        users.forEach(user => {
          const role = user.role;
          if (rolesMap.has(role)) {
            rolesMap.set(role, rolesMap.get(role)! + 1);
          } else {
            rolesMap.set(role, 1);
          }
        });
        // Convert roles map to an array of objects
        return Array.from(rolesMap).map(([role, count]) => ({ role, count }));
      })
    );
  }
}
