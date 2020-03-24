import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { GroupsService } from 'src/app/core/groups.service';
import { UsersService } from 'src/app/core/users.service';
import { Group } from 'src/app/shared/model/group.model';
import { UserData } from 'src/app/shared/model/user-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  userDataSubs: Subscription;
  groupsSubs: Subscription;

  user: UserData;
  groups: Group[];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private groupsService: GroupsService) {

  }

  ngOnInit() {
    console.log('ngOnInit');
    this.initUserData();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.userDataSubs.unsubscribe();
    this.groupsSubs.unsubscribe();
  }

  initUserData() {
    this.userDataSubs = this.authService.getUserCredential()
      .pipe(flatMap(user => this.usersService.findByUid(user.uid)))
      .subscribe(userData => {
        this.user = userData;
        this.initGroups();
      });
  }

  initGroups() {
    this.groupsSubs = this.groupsService.findByUser(this.user)
      .subscribe(groups => this.groups = groups);
  }

}
