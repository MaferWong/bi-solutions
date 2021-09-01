import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class BaseFormRol {

    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormRol = this.fb.group({
        rol_descripcion:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormRol.get(field).touched || this.baseFormRol.get(field).dirty) 
    && (!this.baseFormRol.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormRol.get(field);

   if(errors) {
     const messages = {
        required: 'Value required.'
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}