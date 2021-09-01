import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormReporteRol } from "@app/shared/utils/base-form-reporte_rol";
import { ReporteRolService } from "../../services/reportes_rol.service";

enum Action {
    EDIT='edit',
    NEW='new'
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
    templateUrl: './modal-reporte_rol.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ModalReporteRolComponent implements OnInit {
    actionTODO = Action.NEW;
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
      public reporteRolForm: BaseFormReporteRol,
      private reporteRolSvc: ReporteRolService
    ) { }
  
    ngOnInit(): void {
      this.reporteRolForm.baseFormReporteRol.reset();
      if(this.data?.reporte.hasOwnProperty('reporte_rol_id')){
        this.actionTODO=Action.EDIT;
        this.data.title='Editar Reporte';
        this.pathFormData();
      }
    }
  
    onSave(): void {
      const formValue = this.reporteRolForm.baseFormReporteRol.value;
      if(this.actionTODO === Action.NEW){
        this.reporteRolSvc.new(formValue).subscribe( res => {
          console.log('Nuevo', res)
        })
      } else{
        const reporteId = this.data?.reporte?.id;
        this.reporteRolSvc.update(reporteId, formValue).subscribe( res => {
          console.log('Actualizar', res);
  
        })
      }
    }
  
    checkField(field:string): boolean {
     return this.reporteRolForm.isValidField(field);
    }
  
    private pathFormData(): void{
      this.reporteRolForm.baseFormReporteRol.patchValue({
        rol_id: this.data?.reporte?.rol_id,
        reporte_id: this.data?.reporte?.reporte_id
      });
    }
  }
  