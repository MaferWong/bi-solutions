import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormEditarReporteRol } from "@app/shared/utils/base-form-editar-reporte_rol";
import { ReporteRolService } from "../../../services/reportes_rol.service";

enum Action {
    EDIT='edit'
  }
  
  interface TablaRol {
    value: number;
    viewValue: number;
  }

  interface TablaReporte {
    value: number;
    viewValue: number;
  }

  @Component({
    selector: 'app-modal',
    templateUrl: './modal-editar-reporte_rol.component.html',
    styleUrls: ['./modal-editar-reporte_rol.component.scss']
  })
  export class ModalEditarReporteRolComponent implements OnInit {
    actionTODO = Action.EDIT;
    hide = true;
  
    tablaRol: TablaRol[] = [
      {value: 1, viewValue: 1},
      {value: 2, viewValue: 2},
      {value: 3, viewValue: 3},
      {value: 4, viewValue: 4},
      {value: 5, viewValue: 5},
    ];

    tablaReporte: TablaReporte[] = [
      {value: 1, viewValue: 1},
      {value: 2, viewValue: 2},
      {value: 3, viewValue: 3},
      {value: 4, viewValue: 4},
      {value: 5, viewValue: 5},
    ];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public reporteRolForm: BaseFormEditarReporteRol,
      private reporteRolSvc: ReporteRolService
    ) { }
  
    ngOnInit(): void {
      this.reporteRolForm.baseFormEditarReporteRol.reset();
      if(this.data?.reporte.hasOwnProperty('reporte_rol_id')){
        this.actionTODO=Action.EDIT;
        this.pathFormData();
      }
    }
  
    onSaveEditado(): void {
      const formValue = this.reporteRolForm.baseFormEditarReporteRol.value;

      const reporteId = this.data?.reporte?.reporte_rol_id;
      console.log(formValue);

      if(this.actionTODO === Action.EDIT){
        this.reporteRolSvc.update(reporteId, formValue).subscribe( res => {
          console.log('Actualizar', res);
          this.reporteRolSvc.filter('Register click'); 
        })
      } 
    }
  
    checkField(field:string): boolean {
     return this.reporteRolForm.isValidField(field);
    }
  
    private pathFormData(): void{
      this.reporteRolForm.baseFormEditarReporteRol.patchValue({
        reporte_rol_id: this.data?.reporte?.reporte_rol_id,
        rol_id: this.data?.reporte?.rol_id,
        reporte_id: this.data?.reporte?.reporte_id
      });
    }
  }
  