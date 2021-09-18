import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import { CheckAdminGuard } from './shared/guards/check-admin.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login', pathMatch: 'full' 
  },
  { 
    path: 'login', loadChildren: () => 
    import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [CheckLoginGuard] 
  },
  { 
    path: 'home',
    loadChildren: () => 
    import('./pages/home/home.module').then(m => m.HomeModule),
    canActivateChild: [CheckAdminGuard]  
  }, 
  { 
    path: 'notfound',
    loadChildren: () => 
    import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  }, 
  { 
    path: 'admin', loadChildren: () => 
    import('./pages/admin/admin.module').then(m => m.AdminModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
