import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  login(loginForm: NgForm) {
    if(!loginForm.valid) return
    const user = {
      email: loginForm.value.email,
      password: loginForm.value.password
    }
    this.authService.login(user).then(response => {
      this.authService.handleAuthentication(response.user)
    })
  }
}