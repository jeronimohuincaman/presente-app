import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaPage } from './asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaPage
  },
  {
    path: 'alta',
    loadChildren: () => import('./componentes/alta/alta.module').then(m => m.AltaPageModule)
  }, 
  {
    path: 'editar/:id',
    loadChildren: () => import('./componentes/alta/alta.module').then(m => m.AltaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaPageRoutingModule { }
