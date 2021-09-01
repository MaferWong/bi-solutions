import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class BaseFormUser {

    private isValidEmail = /\S+@\S+\.\S+/;
    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormUsuario = this.fb.group({
        usuario_nombre:['', [Validators.required]],
        usuario_correo:['', [Validators.required, Validators.pattern(this.isValidEmail)]],
        usuario_contrasena:['', [Validators.required, Validators.minLength(8)]],
        usuario_rol_id:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormUsuario.get(field).touched || this.baseFormUsuario.get(field).dirty) 
    && (!this.baseFormUsuario.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormUsuario.get(field);

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