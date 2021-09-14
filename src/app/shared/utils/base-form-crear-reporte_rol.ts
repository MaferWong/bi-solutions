import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseFormCrearReporteRol {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormCrearReporteRol = this.fb.group({
        rol_id:['', [Validators.required]],
        reporte_id:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormCrearReporteRol.get(field).touched || this.baseFormCrearReporteRol.get(field).dirty) 
    && (!this.baseFormCrearReporteRol.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormCrearReporteRol.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}