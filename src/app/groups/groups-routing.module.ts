import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePage } from './create/create.page';
import { ListPage } from './list/list.page';

const routes: Routes = [
  {
    path: 'list',
    component: ListPage
  },
  {
    path: 'create',
    component: CreatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
