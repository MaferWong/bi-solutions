import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormCrearUsuario } from '@app/shared/utils/base-form-crear-usuario';
import { UsuariosService } from '../../../services/usuarios.service';

enum Action {
  NEW='new'
}

interface TablaRoles {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-crear-usuario.component.html',
  styleUrls: ['./modal-crear-usuario.component.scss']
})

export class ModalCrearUsuarioComponent implements OnInit {
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
    public userForm: BaseFormCrearUsuario,
    private userSvc: UsuariosService
  ) { }

  ngOnInit(): void {
    this.userForm.baseFormCrearUsuario.reset();
  }

  onSaveNuevo(): void {
    const formValue = this.userForm.baseFormCrearUsuario.value;
    console.log(this.userForm.baseFormCrearUsuario.value);

    if(this.actionTODO === Action.NEW){
      this.userSvc.new(formValue).subscribe( res => {
        console.log('Nuevo', res);
        this.userSvc.filter('Register click');
      })
    } 
  }

  checkField(field:string): boolean {
   return this.userForm.isValidField(field);
  }
}
