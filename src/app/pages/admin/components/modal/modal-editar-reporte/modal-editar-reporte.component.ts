import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormEditarReporte } from "@app/shared/utils/base-form-editar-reporte";
import { ReportesService } from "../../../services/reportes.service";

enum Action {
    EDIT='edit'
  }
  
  @Component({
    selector: 'app-modal',
    templateUrl: './modal-editar-reporte.component.html',
    styleUrls: ['./modal-editar-reporte.component.scss']
  })
  export class ModalEditarReporteComponent implements OnInit {
    actionTODO = Action.EDIT;
    hide = true;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public reporteForm: BaseFormEditarReporte,
      private reporteSvc: ReportesService
    ) { }
  
    ngOnInit(): void {
      this.reporteForm.baseFormEditarReporte.reset();

      if(this.data?.reporte.hasOwnProperty('reporte_id')){
        this.actionTODO=Action.EDIT;
        this.pathFormData();
      }
    }
  
    onSaveEditado(): void {
      const formValue = this.reporteForm.baseFormEditarReporte.value;

      const reporteId = this.data?.reporte?.reporte_id;

      if(this.actionTODO === Action.EDIT){
        this.reporteSvc.update(reporteId, formValue).subscribe( res => {
          this.reporteSvc.filter('Register click');  
        })
      }  
    }
  
    checkField(field:string): boolean {
     return this.reporteForm.isValidField(field);
    }
  
    private pathFormData(): void{
      this.reporteForm.baseFormEditarReporte.patchValue({
        reporte_id: this.data?.reporte?.reporte_id,
        reporte_descripcion: this.data?.reporte?.reporte_descripcion,
        reporte_URL: this.data?.reporte?.reporte_URL,
        reporte_activo: this.data?.reporte?.reporte_activo
      });
    }
  }
  