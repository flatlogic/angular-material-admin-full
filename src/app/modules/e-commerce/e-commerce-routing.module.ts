import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import {
  ManagementPageComponent,
  ProductCreatePageComponent,
  ProductPageComponent,
  ProductsPageComponent,
  ProductEditPageComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'management'
  },
  {
    path: 'management',
    component: ManagementPageComponent,
  },
  {
    path: 'edit/:id',
    component: ProductEditPageComponent,
  },
  {
    path: 'create',
    component: ProductCreatePageComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'product',
    component: ProductPageComponent,
  },
  {
    path: 'product/:id',
    component: ProductPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ECommerceRoutingModule {
}
