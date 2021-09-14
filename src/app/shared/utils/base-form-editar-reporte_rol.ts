import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseFormEditarReporteRol {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormEditarReporteRol = this.fb.group({
        reporte_rol_id:[],
        rol_id:['', [Validators.required]],
        reporte_id:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormEditarReporteRol.get(field).touched || this.baseFormEditarReporteRol.get(field).dirty) 
    && (!this.baseFormEditarReporteRol.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormEditarReporteRol.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}