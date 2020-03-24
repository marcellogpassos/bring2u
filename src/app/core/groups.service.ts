import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserData } from '../shared/model/user-data.model';
import { Group } from '../shared/model/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private groupsCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.groupsCollection = this.firestore.collection('groups');
  }

  findByUser(user: UserData): Observable<Group[]> {
    return this.firestore
      .collection<Group>('groups', ref => ref.where('participants', 'array-contains', user.uid))
      .valueChanges()
      .pipe(
        tap(groups => groups.forEach(group => group.createdAt = new Date(group.createdAt.seconds * 1000)))
      );
  }

}
