import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  user: any = {}; // Object to store user data
  rolesData: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        // Check if the response contains the 'users' array
        if (response && response.users && Array.isArray(response.users)) {
          // Extract users array from the response
          const users = response.users;
          // Extract unique roles from users data
          this.rolesData = Array.from(new Set(users.map((user: any) => user.role)));
        } else {
          console.error('Invalid users data:', response);
        }
      },
      (error) => {
        console.error('Error fetching users data:', error);
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.userService.registerUser(this.user).subscribe(
        () => {
          console.log('User registered successfully');
          form.resetForm(); // Clear the form after successful registration
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}
