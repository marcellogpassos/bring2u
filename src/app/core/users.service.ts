import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from 'src/app/shared/model/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
  }

  findByUid(uid: string): Observable<UserData> {
    return this.usersCollection.doc<UserData>(uid).valueChanges();
  }

  findByEmail(email: string): Observable<UserData> {
    return this.firestore.collection<UserData>('users', ref => ref.where('email', '==', email)).valueChanges()
      .pipe(
        map(users => users && users.length ? users[0] : null)
      );
  }
}
