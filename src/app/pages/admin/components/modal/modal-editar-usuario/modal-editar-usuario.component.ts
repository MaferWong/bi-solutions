import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '@app/pages/admin/services/roles.service';
import { Roles } from '@app/shared/models/rol.interface';
import { BaseFormEditarUsuario } from '@app/shared/utils/base-form-editar-usuario';
import { UsuariosService } from '../../../services/usuarios.service';

enum Action {
  EDIT='edit'
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-editar-usuario.component.html',
  styleUrls: ['./modal-editar-usuario.component.scss']
})

export class ModalEditarUsuarioComponent implements OnInit {
  actionTODO = Action.EDIT;
  hide = true;
  allRoles: Array<Roles>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormEditarUsuario,
    private userSvc: UsuariosService,
    private rolSvc: RolesService
  ) { }

  ngOnInit(): void {
    this.userForm.baseFormEditarUsuario.reset();
      if(this.data?.user.hasOwnProperty('usuario_id')){
        this.actionTODO=Action.EDIT;
        this.pathFormData();
        this.rolSvc.getAll().subscribe(data => this.allRoles = data);
      }
  }

  onSaveEditado(): void {
    const formValue = this.userForm.baseFormEditarUsuario.value;

      const userId = this.data?.user?.usuario_id;

        if(this.actionTODO === Action.EDIT){
            this.userSvc.update(userId, formValue).subscribe( res => {
              this.userSvc.filter('Register click'); 
            })
        } 
  }

  checkField(field:any): boolean {
   return this.userForm.isValidField(field);
  }

  private pathFormData(): void{
    this.userForm.baseFormEditarUsuario.patchValue({
      usuario_id: this.data?.user?.usuario_id,
      usuario_nombre: this.data?.user?.usuario_nombre,
      usuario_correo: this.data?.user?.usuario_correo,
      usuario_rol_id: this.data?.user?.usuario_rol_id
    });
  }
}