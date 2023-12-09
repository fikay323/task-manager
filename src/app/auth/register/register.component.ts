import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register(registerForm: NgForm) {
    if(!registerForm.valid) return
    const user = {
      email: registerForm.value.email,
      password: registerForm.value.password
    }
    console.log(user)
  }
}