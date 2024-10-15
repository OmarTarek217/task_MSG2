import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private service: AuthenticationService ,private router :Router) { }
  //nourMostafa235@gmail.com
  //12345678
  errorMessages: any[] = []
  isloading:boolean=false
  signUpForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required,Validators.minLength(3)]),
    last_name: new FormControl(null, [Validators.required,Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
    password_confirmation: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/gm)]),
    email: new FormControl(null, [Validators.required,Validators.email]),
  })
  handleSignup(signupData: FormGroup) {
    console.log(signupData.valid)
    this.isloading=true
    this.service.register(signupData.value).subscribe({
      next: (response) => {
        this.isloading=false
        if(response.message === "User registered successfully."){
          Swal.fire({
            icon: "success",
            text: "Registration done successfully",
          }).then(()=>{
            this.router.navigate(["signin"])
          });
        }
      },
      error:(err)=>{
        Swal.fire({
          icon: "error",
          title:"oopps...",
          text: err.error.message,
        })
      }
    })
  }
}
