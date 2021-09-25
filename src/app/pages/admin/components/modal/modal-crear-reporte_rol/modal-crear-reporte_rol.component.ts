import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReportesService } from "@app/pages/admin/services/reportes.service";
import { RolesService } from "@app/pages/admin/services/roles.service";
import { Reporte } from "@app/shared/models/reporte.interface";
import { Roles } from "@app/shared/models/rol.interface";
import { BaseFormCrearReporteRol } from "@app/shared/utils/base-form-crear-reporte_rol";
import { ReporteRolService } from "../../../services/reportes_rol.service";

enum Action {
    NEW='new'
  }

  @Component({
    selector: 'app-modal',
    templateUrl: './modal-crear-reporte_rol.component.html',
    styleUrls: ['./modal-crear-reporte_rol.component.scss']
  })
  export class ModalCrearReporteRolComponent implements OnInit {
    actionTODO = Action.NEW;
    hide = true;
    allRoles: Array<Roles>;
    allReportes: Array<Reporte>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public reporteRolForm: BaseFormCrearReporteRol,
      private reporteRolSvc: ReporteRolService,
      private rolSvc: RolesService,
      private reporteSvc: ReportesService
    ) { }
  
    ngOnInit(): void {
      this.reporteRolForm.baseFormCrearReporteRol.reset();
      this.rolSvc.getAll().subscribe(data => this.allRoles = data);
      this.reporteSvc.getAll().subscribe(data => this.allReportes = data);
    }
  
    onSaveNuevo(): void {
      const formValue = this.reporteRolForm.baseFormCrearReporteRol.value;

      if(this.actionTODO === Action.NEW){
        this.reporteRolSvc.new(formValue).subscribe( res => {
          this.reporteRolSvc.filter('Register click');
        })
      }
    }
  
    checkField(field:any): boolean {
     return this.reporteRolForm.isValidField(field);
    }
  }
  