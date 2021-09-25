import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '@app/pages/admin/services/roles.service';
import { Roles } from '@app/shared/models/rol.interface';
import { BaseFormCrearUsuario } from '@app/shared/utils/base-form-crear-usuario';
import { UsuariosService } from '../../../services/usuarios.service';

enum Action {
  NEW='new'
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-crear-usuario.component.html',
  styleUrls: ['./modal-crear-usuario.component.scss']
})

export class ModalCrearUsuarioComponent implements OnInit {
  actionTODO = Action.NEW;
  hide = true;
  allRoles: Array<Roles>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormCrearUsuario,
    private userSvc: UsuariosService,
    private rolSvc: RolesService
  ) { }

  ngOnInit(): void {
    this.userForm.baseFormCrearUsuario.reset();
    this.rolSvc.getAll().subscribe(data => this.allRoles = data);
  }

  onSaveNuevo(): void {
    const formValue = this.userForm.baseFormCrearUsuario.value;

    if(this.actionTODO === Action.NEW){
      this.userSvc.new(formValue).subscribe( res => {
        this.userSvc.filter('Register click');
      })
    } 
  }

  checkField(field:any): boolean {
   return this.userForm.isValidField(field);
  }
}
