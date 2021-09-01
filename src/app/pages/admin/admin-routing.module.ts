import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent }, 
  { path: 'users', 
    loadChildren: () => 
      import('./users/users.module').then((m) => m.UsersModule) 
  },
  { path: 'reportes', 
    loadChildren: () => 
      import('./reportes/reportes.module').then((m) => m.ReportesModule) 
  },
  { path: 'roles', 
    loadChildren: () => 
      import('./roles/roles.module').then((m) => m.RolesModule) 
  },
  { path: 'reportes-rol', 
    loadChildren: () => 
      import('./reportes-rol/reportes-rol.module').then((m) => m.ReportesRolModule) 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
