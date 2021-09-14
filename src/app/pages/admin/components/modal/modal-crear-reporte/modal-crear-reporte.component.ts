import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormCrearReporte } from "@app/shared/utils/base-form-crear-reporte";

import { ReportesService } from "../../../services/reportes.service";

enum Action {
    NEW='new'
  }
  
  @Component({
    selector: 'app-modal',
    templateUrl: './modal-crear-reporte.component.html',
    styleUrls: ['./modal-crear-reporte.component.scss']
  })
  export class ModalCrearReporteComponent implements OnInit {
    actionTODO = Action.NEW;
    hide = true;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public reporteForm: BaseFormCrearReporte,
      private reporteSvc: ReportesService
    ) { }
  
    ngOnInit(): void {
      this.reporteForm.baseFormCrearReporte.reset();
    }
  
    onSaveNuevo(): void {
      const formValue = this.reporteForm.baseFormCrearReporte.value;
      console.log(this.reporteForm.baseFormCrearReporte.value);

      if(this.actionTODO === Action.NEW){
        this.reporteSvc.new(formValue).subscribe( res => {
          console.log('Nuevo', res);
          this.reporteSvc.filter('Register click');
        })
      } 
    }
  
    checkField(field:string): boolean {
     return this.reporteForm.isValidField(field);
    }
  }
  