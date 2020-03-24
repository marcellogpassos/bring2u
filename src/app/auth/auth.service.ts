import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { actionCodeSettings } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: AngularFireAuth) {
  }

  getUserCredential(): Observable<User> {
    return this.authService.user;
  }

  authenticate(email: string): Promise<void> {
    return this.authService.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => this.storeEmailForSignIn(email));
  }

  validateEmailLink(emailLink: string): Promise<firebase.auth.UserCredential> {
    if (this.authService.isSignInWithEmailLink(emailLink)) {
      return this.authService.signInWithEmailLink(this.retrieveEmailForSignIn(), emailLink)
        .then(userCredential => {
          this.clearEmailForSignIn();
          return userCredential;
        });
    } else {
      throw new Error('Link de autenticação inválido!');
    }
  }

  private storeEmailForSignIn(email: string) {
    window.localStorage.setItem('emailForSignIn', email);
  }

  private retrieveEmailForSignIn(): string {
    const email = window.localStorage.getItem('emailForSignIn');
    if (email) {
      return email;
    } else {
      throw new Error('Não foi possível identificar o e-mail do usuário ao tentar se autenticar!');
    }
  }

  private clearEmailForSignIn() {
    window.localStorage.removeItem('emailForSignIn');
  }

}
