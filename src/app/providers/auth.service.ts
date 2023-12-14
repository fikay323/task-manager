import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  key: string = 'AIzaSyA9SAqzk_9d6uMt364o1HJ3L7rejHsnsVg'
  User = new BehaviorSubject<User>(null)
  logoutTimer

  constructor(private router: Router, private afs: AngularFireAuth) {}
  
  signUp(user: any) {
    return this.afs.createUserWithEmailAndPassword(user.email, user.password)
  }
  
  login(user: any) {
    return this.afs.signInWithEmailAndPassword(user.email, user.password)
  }

  logout() {
    clearTimeout(this.logoutTimer)
    this.afs.signOut().then(() => {  
      this.User.next(null)
      localStorage.removeItem('userData')
      this.router.navigate(['/auth', 'login'])
    })
  }

  autoLogout(time) {
    this.logoutTimer = setTimeout(() => {
      this.logout()
    }, time);
  }

  autoLogin() {
    if(localStorage['userData']) {
      const userData: {
        email: string,
        id: string,
        expiryDate: Date,
        _token: string,
      } = JSON.parse(localStorage.getItem('userData'))
      const user = new User(userData.email, userData.id, userData.expiryDate, userData._token)
      if(user.token) {
        const expiresIn = new Date(new Date(userData.expiryDate).getTime() - new Date().getTime())
        this.User.next(user)
        this.autoLogout(expiresIn.getTime() * 1000)
        this.router.navigate(['/tasks/today'])
      }
    }
  }
    
  handleAuthentication(userdata) {
    let currentDate = new Date();
    let newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 2)
    const user = new User(userdata.email, userdata.uid, newDate, userdata.refreshToken)
    this.User.next(user)
    localStorage.setItem('userData', JSON.stringify(user))
    const expiresIn = new Date(newDate.getTime() - new Date().getTime())
    this.autoLogout(expiresIn.getTime() * 1000)
    this.router.navigate(['/tasks/today'])
  }

  handleError(error) {
    let errorMesssage = 'An unknown error occurred'
    switch(error.code){
      case ('auth/invalid-credential'): 
       errorMesssage = 'Username or password incorrect'
      break;
      case ('auth/too-many-requests'): 
       errorMesssage = 'To many requests, try again later'
      break;
      case ('auth/email-already-in-use'): 
       errorMesssage = 'An account has registered with this email address, try signing in'
      break;
    }
    return errorMesssage
  }
}