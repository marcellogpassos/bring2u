import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsService } from './groups.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UsersService } from './users.service';
import { PendentInvitationsService } from './pendent-invitations.service';



@NgModule({
  declarations: [],
  imports: [
    AngularFirestoreModule,
    CommonModule
  ],
  providers: [
    GroupsService,
    PendentInvitationsService,
    UsersService,
  ]
})
export class CoreModule { }
