import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isLoading: boolean = false;

  constructor(private service: AuthenticationService, private router: Router) {
    this.signUpForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  handleSignup(signupData: FormGroup) {
    this.isLoading =false ;
    this.service.register(signupData.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.message === "User registered successfully.") {
          this.service.saveUserRole(signupData.value.role);
          Swal.fire({
            icon: "success",
            text: "Registration done successfully",
          }).then(() => {
            this.router.navigate(["signin"]);
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.message,
        });
      }
    });
  }
}
