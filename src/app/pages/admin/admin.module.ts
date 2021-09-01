import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalUsuarioComponent } from './components/modal/modal-usuario.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalRolComponent } from './components/modal/modal-rol.component';
import { ModalReporteComponent } from './components/modal/modal-reporte.component';
import { ModalReporteRolComponent } from './components/modal/modal-reporte_rol.component';



@NgModule({
  declarations: [
    AdminComponent,
    ModalUsuarioComponent,
    ModalRolComponent,
    ModalReporteComponent,
    ModalReporteRolComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
