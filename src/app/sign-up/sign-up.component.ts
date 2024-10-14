import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent { 
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]+[0-9]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^0[0-9]{10}$/)]),
    role: new FormControl('', [Validators.required])
  });

  constructor() {
    this.registerForm.get('rePassword')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
  }

  checkPasswordMatch() {
    const password = this.registerForm.get('password')?.value;
    const rePassword = this.registerForm.get('rePassword')?.value;
    
    if (password !== rePassword) {
      this.registerForm.get('rePassword')?.setErrors({ passwordMismatch: true });
    } else {
      this.registerForm.get('rePassword')?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
    }
  }
}
