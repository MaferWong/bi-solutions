import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseFormReporte {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormReporte = this.fb.group({
        reporte_descripcion:['', [Validators.required]],
        reporte_URL:['', [Validators.required]],
        reporte_activo:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormReporte.get(field).touched || this.baseFormReporte.get(field).dirty) 
    && (!this.baseFormReporte.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormReporte.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}