import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormEditarUsuario } from '@app/shared/utils/base-form-editar-usuario';
import { UsuariosService } from '../../../services/usuarios.service';

enum Action {
  EDIT='edit'
}

interface TablaRoles {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-editar-usuario.component.html',
  styleUrls: ['./modal-editar-usuario.component.scss']
})

export class ModalEditarUsuarioComponent implements OnInit {
  actionTODO = Action.EDIT;
  hide = true;

  tablaRoles: TablaRoles[] = [
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 3, viewValue: 3},
    {value: 4, viewValue: 4},
    {value: 5, viewValue: 5},
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormEditarUsuario,
    private userSvc: UsuariosService
  ) { }

  ngOnInit(): void {
    this.userForm.baseFormEditarUsuario.reset();
      if(this.data?.user.hasOwnProperty('usuario_id')){
        this.actionTODO=Action.EDIT;
        this.pathFormData();
      }
  }

  onSaveEditado(): void {
    const formValue = this.userForm.baseFormEditarUsuario.value;

      const userId = this.data?.user?.usuario_id;
      console.log(formValue);

        if(this.actionTODO === Action.EDIT){
            this.userSvc.update(userId, formValue).subscribe( res => {
              console.log('Actualizar', res);
              this.userSvc.filter('Register click'); 
            })
        } 
  }

  checkField(field:string): boolean {
   return this.userForm.isValidField(field);
  }

  private pathFormData(): void{
    this.userForm.baseFormEditarUsuario.patchValue({
      usuario_id: this.data?.user?.usuario_id,
      usuario_nombre: this.data?.user?.usuario_nombre,
      usuario_correo: this.data?.user?.usuario_correo,
      usuario_contrasena: this.data?.user?.usuario_contrasena,
      usuario_rol_id: this.data?.user?.usuario_rol_id
    });
  }
}