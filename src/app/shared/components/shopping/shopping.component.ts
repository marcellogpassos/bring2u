import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Shopping } from '../../model/shopping.model';
import { UsersService } from 'src/app/core/users.service';
import { Subscription } from 'rxjs';
import { UserData } from '../../model/user-data.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnInit {

  @Input()
  shopping: Shopping;

  @Input()
  user: UserData;

  now: Date;

  constructor() {
    this.now = new Date();
  }

  ngOnInit() { }

  showManageShoppingButton(): boolean {
    return this.user && this.user.uid === this.shopping.createdBy;
  }

  showCreateOrderButton(): boolean {
    return !this.showManageShoppingButton() && !this.showManageOrderButton() &&
      (this.shopping.timestamp as Date).getTime() > this.now.getTime();
  }

  showManageOrderButton(): boolean {
    return false;
  }

  manageShopping() {

  }

  createOrder() {

  }

  manageOrder() {

  }

}
