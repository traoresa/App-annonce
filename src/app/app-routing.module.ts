import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorityGuard } from './services/auth/authority.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthorityGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'ad-details/:id',
    loadChildren: () => import('./ad-details/ad-details.module').then( m => m.AdDetailsPageModule),
    canActivate: [AuthorityGuard]
  },
  {
    path: 'ad-insert',
    loadChildren: () => import('./ad-insert/ad-insert.module').then( m => m.AdInsertPageModule),
    canActivate: [AuthorityGuard]
  },
  {
    path: 'ad-update/:id',
    loadChildren: () => import('./ad-update/ad-update.module').then( m => m.AdUpdatePageModule)
  },
  {
    path: 'ad-owner/:uid',
    loadChildren: () => import('./ad-owner/ad-owner.module').then( m => m.AdOwnerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
