import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class BaseFormEditarUsuario {

    private isValidEmail = /\S+@\S+\.\S+/;
    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormEditarUsuario = this.fb.group({
        usuario_id:[],
        usuario_nombre:['', [Validators.required]],
        usuario_correo:['', [Validators.required, Validators.pattern(this.isValidEmail)]],
        usuario_contrasena:['', [Validators.required, Validators.minLength(8)]],
        usuario_rol_id:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormEditarUsuario.get(field).touched || this.baseFormEditarUsuario.get(field).dirty) 
    && (!this.baseFormEditarUsuario.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormEditarUsuario.get(field);

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