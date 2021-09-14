import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class BaseFormEditarRol {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormEditarRol = this.fb.group({
        rol_id:[],
        rol_descripcion:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormEditarRol.get(field).touched || this.baseFormEditarRol.get(field).dirty) 
    && (!this.baseFormEditarRol.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormEditarRol.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}