import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  editForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = ''; 

  constructor(private authService: AuthenticationService) {
    this.editForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]),
      last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ]),
      password_confirmation: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        // console.log(user) 
        if (user && user.data.user.first_name && user.data.user.last_name) {
          this.firstName = user.data.user.first_name;  
          this.lastName = user.data.user.last_name;
          this.email = user.data.user.email;
          this.phone = user.data.user.phone;
          this.editForm.patchValue(user);
        } else {
          console.error('Missing first_name or last_name');
        }
      },
      (error) => {
        console.error('Error loading user data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error loading user data',
          text: 'There was an issue loading your profile data.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }

  onSubmit() {
    if (this.editForm.valid) {
      const profileData = this.editForm.value;
      this.authService.updateProfile(profileData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Your profile information has been updated successfully.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Please fill out the form correctly.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Try Again'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill out the form correctly.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Try Again'
      });
    }
  }
}
