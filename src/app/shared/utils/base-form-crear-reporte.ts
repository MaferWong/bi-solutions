import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseFormCrearReporte {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormCrearReporte = this.fb.group({
        reporte_descripcion:['', [Validators.required]],
        reporte_URL:['', [Validators.required]],
        reporte_activo:[[Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormCrearReporte.get(field).touched || this.baseFormCrearReporte.get(field).dirty) 
    && (!this.baseFormCrearReporte.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormCrearReporte.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}