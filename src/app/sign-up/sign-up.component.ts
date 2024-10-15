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
  constructor(private service: AuthenticationService, private router: Router) {}
  
  registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]+[0-9]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^0[0-9]{10}$/)]),
    role: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
      
      this.router.navigate(['/login'], { queryParams: { 
        email: this.registerForm.value.email,
        password: this.registerForm.value.password 
      }});
      
      Swal.fire({
        title: 'Success!',
        text: 'Registration successful! Redirecting to login...',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      this.registerForm.reset();
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  }
}
