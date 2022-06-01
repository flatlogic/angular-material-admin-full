import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ColorsPageComponent, TypographyPageComponent, GridPageComponent } from './components';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'typography'
  // },
  {
    path: 'typography',
    component: TypographyPageComponent
  },
  {
    path: 'colors',
    component: ColorsPageComponent
  },
  {
    path: 'grid',
    component: GridPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CoreRoutingModule {
}
