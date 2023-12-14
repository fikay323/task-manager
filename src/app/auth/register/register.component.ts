import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isFetching = false

  constructor(private authService: AuthService) {}

  register(registerForm: NgForm) {
    if(!registerForm.valid) return
    this.isFetching = true
    const user = {
      email: registerForm.value.email,
      password: registerForm.value.password
    }
    this.authService.signUp(user).then(response => {
      this.isFetching = false
      this.authService.handleAuthentication(response.user)
    })
    .catch(error => {
      this.authService.handleError(error)
    })
  }
}