import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormReporte } from "@app/shared/utils/base-form-reporte";
import { ReportesService } from "../../services/reportes.service";

enum Action {
    EDIT='edit',
    NEW='new'
  }
  
  @Component({
    selector: 'app-modal',
    templateUrl: './modal-reporte.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ModalReporteComponent implements OnInit {
    actionTODO = Action.NEW;
    hide = true;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public reporteForm: BaseFormReporte,
      private reporteSvc: ReportesService
    ) { }
  
    ngOnInit(): void {
      this.reporteForm.baseFormReporte.reset();
      if(this.data?.reporte.hasOwnProperty('reporte_id')){
        this.actionTODO=Action.EDIT;
        this.data.title='Editar Reporte';
        this.pathFormData();
      }
    }
  
    onSave(): void {
      const formValue = this.reporteForm.baseFormReporte.value;
      if(this.actionTODO === Action.NEW){
        this.reporteSvc.new(formValue).subscribe( res => {
          console.log('Nuevo', res)
        })
      } else{
        const reporteId = this.data?.reporte?.id;
        this.reporteSvc.update(reporteId, formValue).subscribe( res => {
          console.log('Actualizar', res);
  
        })
      }
    }
  
    checkField(field:string): boolean {
     return this.reporteForm.isValidField(field);
    }
  
    private pathFormData(): void{
      this.reporteForm.baseFormReporte.patchValue({
        reporte_descripcion: this.data?.reporte?.reporte_descripcion,
        reporte_URL: this.data?.reporte?.reporte_URL,
        reporte_activo: this.data?.reporte?.reporte_activo
      });
    }
  }
  