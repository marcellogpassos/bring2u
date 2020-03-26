import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Shopping } from '../shared/model/shopping.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingsService {

  private shoppingsCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.shoppingsCollection = this.firestore.collection<Shopping>('shoppings');
  }

  create(shopping: Shopping): Promise<DocumentReference> {
    return this.shoppingsCollection.add(shopping)
      .then(ref => this.updateUid(ref));
  }

  updateUid(ref: DocumentReference): Promise<DocumentReference> {
    return this.firestore.doc(ref.path).update({ uid: ref.id })
      .then(() => ref);
  }

}
