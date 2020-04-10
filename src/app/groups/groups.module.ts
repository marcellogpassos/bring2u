import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { ShoppingModule } from '../shopping/shopping.module';
import { CreatePage } from './create/create.page';
import { GroupsPageRoutingModule } from './groups-routing.module';
import { ListPage } from './list/list.page';
import { ShoppingsPage } from './shoppings/shoppings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsPageRoutingModule,
    SharedModule,
    ShoppingModule
  ],
  declarations: [
    CreatePage,
    ListPage,
    ShoppingsPage,
  ]
})
export class GroupsPageModule { }
