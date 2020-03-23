import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { actionCodeSettings } from 'src/environments/environment';
import { UserData } from 'src/app/shared/model/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection;

  constructor(private authService: AngularFireAuth, private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
  }

  getUserCredential(): Observable<User> {
    return this.authService.user;
  }

  getUserData(): Observable<UserData> {
    return this.getUserCredential()
      .pipe(
        flatMap(user => this.usersCollection.doc<UserData>(user.uid).valueChanges())
      );
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
