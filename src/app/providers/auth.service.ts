import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

export interface AuthResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  key: string = 'AIzaSyA9SAqzk_9d6uMt364o1HJ3L7rejHsnsVg'
  User = new BehaviorSubject<User>(null)
  tokenExpirationTimer: any

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: any) {
    return this.http.post<AuthResponse>(
     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.key}`,
     { email: user.email, password: user.password, returnSecureToken: true }
    ).pipe(tap(response => {
      this.handleAuthentication(response.email, response.idToken, response.refreshToken, +response.expiresIn)
      console.log(response)
    }))
  }
  
  login(user: any) {
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.key}`,
      { email: user.email, password: user.password, returnSecureToken: true }
      ).pipe(tap(response => {
      this.handleAuthentication(response.email, response.idToken, response.refreshToken, +response.expiresIn)
    }))
  }

  logout() {
    this.User.next(null)
    localStorage.removeItem('userData')
    clearTimeout(this.tokenExpirationTimer)
    this.router.navigate(['/auth', 'login'])
  }

  autoLogout(expiryTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expiryTime);
  }

  autoLogin() {
    if(localStorage['userData']) {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: Date
      } = JSON.parse(localStorage.getItem('userData'))
      const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
      if(user.token) {
        this.User.next(user)
        const expiryDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        console.log(user.id)
        this.autoLogout(expiryDate)
      }
    }
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000)
    const user = new User(email, id, token, expirationDate)
    console.log(id)
    this.User.next(user)
    localStorage.setItem('userData', JSON.stringify(user))
    this.autoLogout(expirationDate.getTime())
    this.router.navigate(['/tasks'])
  }
}
