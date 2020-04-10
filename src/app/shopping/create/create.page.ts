import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/core/users.service';
import { GroupsService } from 'src/app/core/groups.service';
import { Subscription } from 'rxjs';
import { UserData } from 'src/app/shared/model/user-data.model';
import { Group } from 'src/app/shared/model/group.model';
import { flatMap } from 'rxjs/operators';
import { Shopping, getTimestamp, convertWhen, convertWhatTime } from 'src/app/shared/model/shopping.model';
import { ShoppingsService } from '../shoppings.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit, OnDestroy {

  shopping: Shopping;
  now: Date;
  min: string;

  userDataSubs: Subscription;
  groupsSubs: Subscription;

  user: UserData;
  groups: Group[];

  constructor(
    private alert: AlertController,
    private nav: NavController,
    private authService: AuthService,
    private usersService: UsersService,
    private groupsService: GroupsService,
    private shoppingsService: ShoppingsService) {
    this.now = new Date();
    this.min = this.now.toISOString();
    this.shopping = {
      where: '',
      when: convertWhen(this.now),
      whatTime: convertWhatTime(this.now),
      visibility: []
    };
  }

  ngOnInit() {
    this.initUserData();
  }

  ngOnDestroy(): void {
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

  confirm() {
    this.shopping.timestamp = getTimestamp(this.shopping.when, this.shopping.whatTime);
    this.shopping.createdBy = this.user.uid;
    this.shopping.createdAt = new Date();
    this.shoppingsService.create(this.shopping)
      .then(ref => this.success());
  }

  async success() {
    const alert = await this.alert.create({
      header: 'Sucesso!',
      message: `A ida a ${this.shopping.where} foi cadastrada com sucesso.`,
      buttons: ['OK']
    });
    alert.present().then(() => this.nav.back());
  }

  valid(): boolean {
    return this.shopping.where &&
      this.shopping.when &&
      this.shopping.whatTime &&
      this.shopping.visibility &&
      this.shopping.visibility.length > 0;
  }

}
