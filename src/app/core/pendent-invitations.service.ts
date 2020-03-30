import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class PendentInvitationsService {

    private pendentInivitationsCollection: AngularFirestoreCollection;

    constructor(private firestore: AngularFirestore) {
        this.pendentInivitationsCollection = this.firestore.collection('pendent-invitations');
    }

    create(email: string, groupId: string) {
        this.pendentInivitationsCollection.add({ email, groupId });
    }

    createAll(emails: string[], groupId: string) {
        emails.forEach(email => this.create(email, groupId));
    }

}
