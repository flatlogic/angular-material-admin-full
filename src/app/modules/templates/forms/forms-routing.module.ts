import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormElementsPageComponent, FormValidationPageComponent} from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'elements'
  },
  {
    path: 'elements',
    component: FormElementsPageComponent
  },
  {
    path: 'validation',
    component: FormValidationPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class FormsRoutingModule {
}
