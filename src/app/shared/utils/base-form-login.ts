import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseFormLogin {

    private isValidEmail = /\S+@\S+\.\S+/;
    errorMessage = null;
    
    constructor(private fb:FormBuilder) {
        
    }

    baseFormLogin = this.fb.group({
        login_correo:['', [Validators.required, Validators.pattern(this.isValidEmail)]],
        login_contrasena:['', [Validators.required, Validators.minLength(8)]],
        login_usuario_rol:['', [Validators.required]]
    });

  isValidField(field:string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseFormLogin.get(field).touched || this.baseFormLogin.get(field).dirty) 
    && (!this.baseFormLogin.get(field).valid)
    );
  }

  private getErrorMessage(field:string): void {
   const {errors} = this.baseFormLogin.get(field);

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