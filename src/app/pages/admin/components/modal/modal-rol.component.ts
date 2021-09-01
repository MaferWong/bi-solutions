import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormRol } from "@app/shared/utils/base-form-rol";
import { RolesService } from "../../services/roles.service";

enum Action {
    EDIT='edit',
    NEW='new'
  }
  
  @Component({
    selector: 'app-modal',
    templateUrl: './modal-rol.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ModalRolComponent implements OnInit {
    actionTODO = Action.NEW;
    hide = true;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public rolForm: BaseFormRol,
      private rolSvc: RolesService
    ) { }
  
    ngOnInit(): void {
      this.rolForm.baseFormRol.reset();
      if(this.data?.rol.hasOwnProperty('rol_id')){
        this.actionTODO=Action.EDIT;
        this.data.title='Editar Rol';
        this.pathFormData();
      }
    }
  
    onSave(): void {
      const formValue = this.rolForm.baseFormRol.value;
      if(this.actionTODO === Action.NEW){
        this.rolSvc.new(formValue).subscribe( res => {
          console.log('Nuevo', res)
        })
      } else{
        const rolId = this.data?.rol?.id;
        this.rolSvc.update(rolId, formValue).subscribe( res => {
          console.log('Actualizar', res);
  
        })
      }
    }
  
    checkField(field:string): boolean {
     return this.rolForm.isValidField(field);
    }
  
    private pathFormData(): void{
      this.rolForm.baseFormRol.patchValue({
        rol_descripcion: this.data?.rol?.rol_descripcion
      });
    }
  }