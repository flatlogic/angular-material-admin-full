import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GoogleMapPageComponent } from './components';
import { VectorMapPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'google'
  },
  {
    path: 'google',
    component: GoogleMapPageComponent
  },
  {
    path: 'vector',
    component: VectorMapPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class MapsRoutingModule {
}
