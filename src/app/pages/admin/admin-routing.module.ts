import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAdminGuard } from '@app/shared/guards/check-admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent }, 
  { path: 'users', 
    loadChildren: () => 
      import('./users/users.module').then((m) => m.UsersModule),
      canActivateChild: [CheckAdminGuard] 
  },
  { path: 'reportes', 
    loadChildren: () => 
      import('./reportes/reportes.module').then((m) => m.ReportesModule),
      canActivateChild: [CheckAdminGuard]  
  },
  { path: 'roles', 
    loadChildren: () => 
      import('./roles/roles.module').then((m) => m.RolesModule),
      canActivateChild: [CheckAdminGuard]  
  },
  { path: 'reportes-rol', 
    loadChildren: () => 
      import('./reportes-rol/reportes-rol.module').then((m) => m.ReportesRolModule),
      canActivateChild: [CheckAdminGuard]  
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
