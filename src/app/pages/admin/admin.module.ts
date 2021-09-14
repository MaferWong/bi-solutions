import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalCrearRolComponent } from './components/modal/modal-crear-rol/modal-crear-rol.component';
import { ModalEditarRolComponent } from './components/modal/modal-editar-rol/modal-editar-rol.component';
import { ModalCrearReporteComponent } from './components/modal/modal-crear-reporte/modal-crear-reporte.component';
import { ModalEditarReporteComponent } from './components/modal/modal-editar-reporte/modal-editar-reporte.component';
import { ModalCrearUsuarioComponent } from './components/modal/modal-crear-usuario/modal-crear-usuario.component';
import { ModalEditarUsuarioComponent } from './components/modal/modal-editar-usuario/modal-editar-usuario.component';
import { ModalCrearReporteRolComponent } from './components/modal/modal-crear-reporte_rol/modal-crear-reporte_rol.component';
import { ModalEditarReporteRolComponent } from './components/modal/modal-editar-reporte_rol/modal-editar-reporte_rol.component';



@NgModule({
  declarations: [
    AdminComponent,
    ModalCrearUsuarioComponent,
    ModalEditarUsuarioComponent,
    ModalCrearRolComponent,
    ModalEditarRolComponent,
    ModalCrearReporteComponent,
    ModalEditarReporteComponent,
    ModalCrearReporteRolComponent,
    ModalEditarReporteRolComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
