import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class BaseFormCrearUsuario {

    private isValidEmail = /\S+@\S+\.\S+/;
    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormCrearUsuario = this.fb.group({
        usuario_nombre:['', [Validators.required]],
        usuario_correo:['', [Validators.required, Validators.pattern(this.isValidEmail)]],
        usuario_contrasena:['', [Validators.required, Validators.minLength(8)]],
        usuario_rol_id:['',[Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormCrearUsuario.get(field).touched || this.baseFormCrearUsuario.get(field).dirty) 
    && (!this.baseFormCrearUsuario.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormCrearUsuario.get(field);

   if(errors) {
     const minlength = errors?.minlength?.requiredLength;
     const messages = {
        required: 'Value required.',
        pattern: 'Not a valid email.',
        minlength: `Password must be longer than ${minlength} characters.`
     };

     const errorKey = Object.keys(errors).find(Boolean);
     this.errorMessage = messages[errorKey];
   }
  }
}