import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/core/users.service';
import { Shopping } from 'src/app/shared/model/shopping.model';
import { UserData } from 'src/app/shared/model/user-data.model';
import { ShoppingsService } from 'src/app/shopping/shoppings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  userDataSubs: Subscription;
  shoppingsSubs: Subscription;

  user: UserData;
  news: Shopping[];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private shoppingsService: ShoppingsService) {

  }

  ngOnInit() {
    this.initUserData();
  }

  ngOnDestroy(): void {
    this.userDataSubs.unsubscribe();
    this.shoppingsSubs.unsubscribe();
  }

  initUserData() {
    this.userDataSubs = this.authService.getUserCredential()
      .pipe(flatMap(user => this.usersService.findByUid(user.uid)))
      .subscribe(userData => {
        this.user = userData;
        this.initNews();
      });
  }

  initNews() {
    this.shoppingsSubs = this.shoppingsService.getNewsByUser(this.user)
      .subscribe(result => {
        this.news = result;
      });
  }

}
