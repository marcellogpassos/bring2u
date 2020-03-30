import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { GroupsService } from 'src/app/core/groups.service';
import { Group } from 'src/app/shared/model/group.model';
import { Shopping } from 'src/app/shared/model/shopping.model';
import { UserData } from 'src/app/shared/model/user-data.model';
import { convertTimestamp, Timestamp, updateUid } from 'src/app/shared/util';

@Injectable({
  providedIn: 'root'
})
export class ShoppingsService {

  private shoppingsCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore, private groupService: GroupsService) {
    this.shoppingsCollection = this.firestore.collection<Shopping>('shoppings');
  }

  create(shopping: Shopping): Promise<DocumentReference> {
    return this.shoppingsCollection.add(shopping).then(ref => updateUid(this.firestore.doc(ref.path), ref));
  }

  getNewsByUser(user: UserData): Observable<Shopping[]> {
    return this.groupService.findByUser(user)
      .pipe(
        flatMap(groupList => this.getNewsByGroupList(user, groupList))
      );
  }

  getNewsByGroupList(user: UserData, groupList: Group[]): Observable<Shopping[]> {
    const groupIdList = groupList.map(group => group.uid);
    const now = new Date();
    return this.firestore.collection<Shopping>('shoppings', ref => ref.where('visibility', 'array-contains-any', groupIdList))
      .valueChanges()
      .pipe(
        map(shoppings => shoppings.filter(shopping => shopping.createdBy !== user.uid)),
        tap(shoppings => shoppings.forEach(shopping => shopping.timestamp = convertTimestamp(shopping.timestamp as Timestamp))),
        map(shoppings => shoppings.filter(shopping => now.getTime() < (shopping.timestamp as Date).getTime())),
      );
  }

}
