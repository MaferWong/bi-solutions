import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReportesService } from "@app/pages/admin/services/reportes.service";
import { RolesService } from "@app/pages/admin/services/roles.service";
import { Reporte } from "@app/shared/models/reporte.interface";
import { Roles } from "@app/shared/models/rol.interface";
import { BaseFormEditarReporteRol } from "@app/shared/utils/base-form-editar-reporte_rol";
import { ReporteRolService } from "../../../services/reportes_rol.service";

enum Action {
    EDIT='edit'
  }

  @Component({
    selector: 'app-modal',
    templateUrl: './modal-editar-reporte_rol.component.html',
    styleUrls: ['./modal-editar-reporte_rol.component.scss']
  })
  export class ModalEditarReporteRolComponent implements OnInit {
    actionTODO = Action.EDIT;
    hide = true;
    allRoles: Array<Roles>;
    allReportes: Array<Reporte>;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public reporteRolForm: BaseFormEditarReporteRol,
      private reporteRolSvc: ReporteRolService,
      private rolSvc: RolesService,
      private reporteSvc: ReportesService
    ) { }
  
    ngOnInit(): void {
      this.reporteRolForm.baseFormEditarReporteRol.reset();
      if(this.data?.reportesRol.hasOwnProperty('reporte_rol_id')){
        this.actionTODO=Action.EDIT;
        this.pathFormData();
        this.rolSvc.getAll().subscribe(data => this.allRoles = data);
        this.reporteSvc.getAll().subscribe(data => this.allReportes = data);
      }
    }
  
    onSaveEditado(): void {
      const formValue = this.reporteRolForm.baseFormEditarReporteRol.value;

      const reporteRolId = this.data?.reportesRol?.reporte_rol_id;

      if(this.actionTODO === Action.EDIT){
        this.reporteRolSvc.update(reporteRolId, formValue).subscribe( res => {
          this.reporteRolSvc.filter('Register click'); 
        })
      } 
    }
  
    checkField(field:any): boolean {
     return this.reporteRolForm.isValidField(field);
    }
  
    private pathFormData(): void{
      this.reporteRolForm.baseFormEditarReporteRol.patchValue({
        reporte_rol_id: this.data?.reportesRol?.reporte_rol_id,
        rol_id: this.data?.reportesRol?.rol_id,
        reporte_id: this.data?.reportesRol?.reporte_id
      });
    }
  }
  