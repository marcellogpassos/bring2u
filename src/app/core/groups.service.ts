import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Group } from 'src/app/shared/model/group.model';
import { Participant } from 'src/app/shared/model/participant.model';
import { UserData } from 'src/app/shared/model/user-data.model';
import { convertTimestamp, updateUid } from 'src/app/shared/util';
import { PendentInvitationsService } from './pendent-invitations.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private groupsCollection: AngularFirestoreCollection;

  constructor(
    private firestore: AngularFirestore,
    private pendentInvitationsService: PendentInvitationsService) {
    this.groupsCollection = this.firestore.collection('groups');
  }

  findByUser(user: UserData): Observable<Group[]> {
    return this.firestore
      .collection<Group>('groups', ref => ref.where('participants', 'array-contains', user.uid))
      .valueChanges()
      .pipe(
        tap(groups => groups.forEach(group => group.createdAt = convertTimestamp(group.createdAt)))
      );
  }

  create(user: UserData, groupName: string, participants: Participant[]): Promise<DocumentReference> {
    const group: Group = {
      createdAt: new Date(),
      createdBy: user.uid,
      groupName,
      participants: participants.filter(p => p.user !== null).map(p => p.user.uid)
    };
    group.participants.push(user.uid);
    return this.groupsCollection.add(group)
      .then(ref => updateUid(this.firestore.doc(ref.path), ref))
      .then(ref => this.createPendentInvitations(participants, ref));
  }

  createPendentInvitations(participants: Participant[], ref: DocumentReference) {
    const anonymousUsers = participants.filter(p => !p.user).map(p => p.email);
    this.pendentInvitationsService.createAll(anonymousUsers, ref.id);
    return ref;
  }

}
