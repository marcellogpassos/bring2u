import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from 'src/app/shared/model/group.model';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/core/groups.service';
import { map, flatMap, tap } from 'rxjs/operators';
import { Shopping } from 'src/app/shared/model/shopping.model';
import { ShoppingsService } from 'src/app/shopping/shoppings.service';
import { UserData } from 'src/app/shared/model/user-data.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/core/users.service';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.page.html',
  styleUrls: ['./shoppings.page.scss'],
})
export class ShoppingsPage implements OnInit, OnDestroy {

  group: Group;
  shoppings: Shopping[];

  user: UserData;

  groupAndShoppingsSub: Subscription;
  userDataSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private groupsService: GroupsService,
    private shoppingsService: ShoppingsService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.initGroupAndShoppings();
    this.initUserData();
  }

  ngOnDestroy() {
    this.groupAndShoppingsSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }

  private initGroupAndShoppings() {
    this.groupAndShoppingsSub = this.route.params
      .pipe(
        map((params: any) => params.id),
        flatMap(id => this.groupsService.findById(id)),
        tap(group => this.group = group),
        flatMap(() => this.shoppingsService.getByGroup(this.group)),
      )
      .subscribe(shoppings => this.shoppings = shoppings);
  }

  private initUserData() {
    this.userDataSub = this.authService.getUserCredential()
      .pipe(flatMap(user => this.usersService.findByUid(user.uid)))
      .subscribe(userData => this.user = userData);
  }

}
