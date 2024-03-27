import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'assets/users.json'; // Path to the users JSON file

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  registerUser(user: any): Observable<any> {
    // Implement your user registration logic here
    return this.http.post<any>('API_URL_TO_REGISTER_USER', user);
  }
}
