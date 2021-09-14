import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormCrearReporteRol } from "@app/shared/utils/base-form-crear-reporte_rol";
import { ReporteRolService } from "../../../services/reportes_rol.service";

enum Action {
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
    templateUrl: './modal-crear-reporte_rol.component.html',
    styleUrls: ['./modal-crear-reporte_rol.component.scss']
  })
  export class ModalCrearReporteRolComponent implements OnInit {
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
      public reporteRolForm: BaseFormCrearReporteRol,
      private reporteRolSvc: ReporteRolService
    ) { }
  
    ngOnInit(): void {
      this.reporteRolForm.baseFormCrearReporteRol.reset();
    }
  
    onSaveNuevo(): void {
      const formValue = this.reporteRolForm.baseFormCrearReporteRol.value;
      console.log(this.reporteRolForm.baseFormCrearReporteRol.value);

      if(this.actionTODO === Action.NEW){
        this.reporteRolSvc.new(formValue).subscribe( res => {
          console.log('Nuevo', res);
          this.reporteRolSvc.filter('Register click');
        })
      }
    }
  
    checkField(field:string): boolean {
     return this.reporteRolForm.isValidField(field);
    }
  }
  