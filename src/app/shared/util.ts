import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';

export interface Timestamp {
    seconds: number;
    nanoseconds: number;
}

export function convertTimestamp(timestamp: Timestamp) {
    return new Date(timestamp.seconds * 1000);
}

export function updateUid(doc: AngularFirestoreDocument, ref: DocumentReference): Promise<DocumentReference> {
    return doc.update({ uid: ref.id })
        .then(() => ref);
}
