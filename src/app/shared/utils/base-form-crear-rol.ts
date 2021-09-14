import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class BaseFormCrearRol {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormCrearRol = this.fb.group({
        rol_descripcion:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormCrearRol.get(field).touched || this.baseFormCrearRol.get(field).dirty) 
    && (!this.baseFormCrearRol.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormCrearRol.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}