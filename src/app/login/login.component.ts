import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup=new FormGroup({
  email : new FormControl(null,[Validators.required, Validators.pattern(/^[a-zA-Z]+[0-9]*@[a-z]+.com$/gm)]),
  password: new FormControl(null, [Validators.required,Validators.minLength(8)])
  })

handlelogin(form:FormGroup){
  console.log(form);
}

}
