import { Injectable } from '@angular/core';
import { 
  Auth, 
  authState, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  updateProfile,
  User,
  UserCredential
 } from '@angular/fire/auth';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User | null>;
  
  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
  }

  signup(email: string, password: string, displayName: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        return updateProfile(userCredential.user, { displayName });
      });
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/');
    });;
  }

  isLoggedIn(): Observable<User | null> {
    return this.currentUser;
  }
  
  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}

