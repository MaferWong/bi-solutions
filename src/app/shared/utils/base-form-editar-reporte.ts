import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseFormEditarReporte {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormEditarReporte = this.fb.group({
        reporte_id:[],
        reporte_descripcion:['', [Validators.required]],
        reporte_URL:['', [Validators.required]],
        reporte_activo:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormEditarReporte.get(field).touched || this.baseFormEditarReporte.get(field).dirty) 
    && (!this.baseFormEditarReporte.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormEditarReporte.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}