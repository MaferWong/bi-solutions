import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseFormReporteRol {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormReporteRol = this.fb.group({
        rol_id:['', [Validators.required]],
        reporte_id:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormReporteRol.get(field).touched || this.baseFormReporteRol.get(field).dirty) 
    && (!this.baseFormReporteRol.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormReporteRol.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}