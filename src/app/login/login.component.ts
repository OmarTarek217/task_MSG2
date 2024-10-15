import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private service: AuthenticationService, private route: ActivatedRoute) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]+[0-9]*@[a-z]+.com$/gm)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.loginForm.patchValue({
          email: params['email'],
          password: params['password']
        });
      }
    });
  }

  handleLogin(form: FormGroup) {
    this.service.login(form.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.message === "User logged in successfully.") {
          Swal.fire({
            icon: "success",
            text: "Sign in done successfully!",
          });
        }
      },
      error: (err) => {
        console.log(err); 
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.message,
        });
      }
    });
  }
}
