import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'explorer',
        loadChildren: () =>
          import('../explore-container/explore-container.module').then((m) => m.ExploreContainerComponentModule),
      },
      {
        path: 'camera',
        loadChildren: () =>
          import('../camera-location/camera-location.module').then(
            (m) => m.CameraLocationPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/camera',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/camera',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
