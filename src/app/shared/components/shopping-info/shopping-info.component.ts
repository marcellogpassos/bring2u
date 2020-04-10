import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/users.service';
import { Shopping } from '../../model/shopping.model';

@Component({
  selector: 'app-shopping-info',
  templateUrl: './shopping-info.component.html',
  styleUrls: ['./shopping-info.component.scss'],
})
export class ShoppingInfoComponent implements OnInit, OnDestroy {

  @Input()
  shopping: Shopping;

  createdByUserDataSub: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.initCreatedByUserData();
  }

  ngOnDestroy(): void {
    this.createdByUserDataSub.unsubscribe();
  }

  private initCreatedByUserData() {
    this.createdByUserDataSub = this.usersService.findByUid(this.shopping.createdBy)
      .subscribe(result => this.shopping.createdByUserData = result);
  }

}
