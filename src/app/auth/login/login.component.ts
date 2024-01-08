import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isFetching = false
  errorMessage = null

  constructor(private authService: AuthService) {}

  login(loginForm: NgForm) {
    if(!loginForm.valid) return
    this.isFetching = true
    const user = {
      email: loginForm.value.email,
      password: loginForm.value.password
    }
    this.authService.login(user).then(response => {
      this.authService.handleAuthentication(response.user, this.isFetching)
    })
    .catch(error => {
      this.isFetching = false
      this.errorMessage = this.authService.handleError(error)
    })
  }

  closeAlertComponent() {
    this.errorMessage = null
  }

}