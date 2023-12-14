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

  constructor(private router: Router, private afs: AngularFireAuth) {}
  
  signUp(user: any) {
    return this.afs.createUserWithEmailAndPassword(user.email, user.password)
  }
  
  login(user: any) {
    return this.afs.signInWithEmailAndPassword(user.email, user.password)
  }

  logout() {
    this.afs.signOut().then(() => {  
      this.User.next(null)
      localStorage.removeItem('userData')
      this.router.navigate(['/auth', 'login'])
    })
  }

  autoLogout() {}

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
          this.User.next(user)
      }
    }
  }
    
  handleAuthentication(userdata) {
    let currentDate = new Date();
    let newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 2)
    const user = new User(userdata.email, userdata.uid, newDate, userdata.refreshToken)
    console.log(user.id)
    this.User.next(user)
    localStorage.setItem('userData', JSON.stringify(user))
    this.router.navigate(['/tasks'])
  }
}