import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  ListPageComponent,
  AddPageComponent,
  EditPageComponent,
  ProfilePageComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ListPageComponent
  },
  {
    path: 'add',
    component: AddPageComponent
  },
  {
    path: 'edit',
    component: EditPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
