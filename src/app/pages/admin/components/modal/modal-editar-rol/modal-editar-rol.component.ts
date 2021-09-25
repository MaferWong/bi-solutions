import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormEditarRol } from "@app/shared/utils/base-form-editar-rol";
import { RolesService } from "../../../services/roles.service";

enum Action {
    EDIT='edit'
  }
  
  @Component({
    selector: 'app-modal',
    templateUrl: './modal-editar-rol.component.html',
    styleUrls: ['./modal-editar-rol.component.scss']
  })
  export class ModalEditarRolComponent implements OnInit {
    actionTODO = Action.EDIT;
    hide = true;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public rolForm: BaseFormEditarRol,
      private rolSvc: RolesService
    ) { }
  
    ngOnInit(): void {
      this.rolForm.baseFormEditarRol.reset();
      if(this.data?.rol.hasOwnProperty('rol_id')){
        this.actionTODO=Action.EDIT;
        this.pathFormData();
      }
    }
  
    onSaveEditado(): void {
      const formValue = this.rolForm.baseFormEditarRol.value;

      const rolId = this.data?.rol?.rol_id;

        if(this.actionTODO === Action.EDIT){
            this.rolSvc.update(rolId, formValue).subscribe( res => {
              this.rolSvc.filter('Register click');  
            })
        } 
    }
  
    checkField(field:string): boolean {
     return this.rolForm.isValidField(field);
    }
  
    private pathFormData(): void {
      this.rolForm.baseFormEditarRol.patchValue({
        rol_id: this.data?.rol?.rol_id,
        rol_descripcion: this.data?.rol?.rol_descripcion
      });
    }
  }