import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private service: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.loginForm.patchValue({
          email: params['email'],
          password: params['password'],
        });
      }
    });
  }

  handleLogin() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.data.access_token && response.message === 'User logged in successfully.') {
            // Save the token and user role
            this.service.saveToken(response.data.access_token);
            this.service.saveUserRole(response.data.user.role); // Assuming the role is returned here
  
            // Navigate to the teacher dashboard
            this.router.navigate(['/teacher-dashboard']);
            Swal.fire({
              icon: 'success',
              text: 'Sign in done successfully!',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Unauthorized access.',
            });
          }
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
        },
      });
    }
  }
}
