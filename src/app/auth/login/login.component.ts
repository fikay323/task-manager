import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login(loginForm: NgForm) {
    if(!loginForm.valid) return
    const user = {
      email: loginForm.value.email,
      password: loginForm.value.password
    }
    console.log(user)
  }
}
