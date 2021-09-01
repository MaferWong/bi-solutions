import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormUser } from '@app/shared/utils/base-form-user';
import { UsuariosService } from '../../services/usuarios.service';

enum Action {
  EDIT='edit',
  NEW='new'
}

interface TablaRoles {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalUsuarioComponent implements OnInit {
  actionTODO = Action.NEW;
  hide = true;

  tablaRoles: TablaRoles[] = [
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 3, viewValue: 3},
    {value: 4, viewValue: 4},
    {value: 5, viewValue: 5},
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUser,
    private userSvc: UsuariosService
  ) { }

  ngOnInit(): void {
    this.userForm.baseFormUsuario.reset();
    if(this.data?.user.hasOwnProperty('usuario_id')){
      this.actionTODO=Action.EDIT;
      this.data.title='Editar Usuario';
      this.pathFormData();
    }
  }

  onSave(): void {
    const formValue = this.userForm.baseFormUsuario.value;
    if(this.actionTODO === Action.NEW){
      this.userSvc.new(formValue).subscribe( res => {
        console.log('Nuevo', res)
      })
    } else{
      const userId = this.data?.user?.usuario_id;
      this.userSvc.update(userId, formValue).subscribe( res => {
        console.log('Actualizar', res);

      })
    }
  }

  checkField(field:string): boolean {
   return this.userForm.isValidField(field);
  }

  private pathFormData(): void{
    this.userForm.baseFormUsuario.patchValue({
      usuario_nombre: this.data?.user?.usuario_nombre,
      usuario_correo: this.data?.user?.usuario_correo,
      usuario_contrasena: this.data?.user?.usuario_contrasena,
      usuario_rol_id: this.data?.user?.usuario_rol_id
    });
  }
}
