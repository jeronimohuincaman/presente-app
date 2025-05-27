import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraLocationPage } from './camera-location.page';

const routes: Routes = [
  {
    path: '',
    component: CameraLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraLocationPageRoutingModule {}
