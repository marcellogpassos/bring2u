import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePage } from './create/create.page';
import { ListPage } from './list/list.page';
import { ShoppingsPage } from './shoppings/shoppings.page';

const routes: Routes = [
  {
    path: 'list',
    component: ListPage
  },
  {
    path: 'create',
    component: CreatePage,
  },
  {
    path: ':id/shoppings',
    component: ShoppingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule { }
