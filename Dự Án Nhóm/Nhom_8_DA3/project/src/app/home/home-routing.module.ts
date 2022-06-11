import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import("../pages/home/home.module").then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () => import("../pages/search/search.module").then(m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'store',
        children: [
          {
            path: '',
            loadChildren: () => import("../pages/store/store.module").then(m => m.StorePageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import("../pages/profile/profile.module").then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
