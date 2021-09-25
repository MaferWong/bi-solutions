import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseFormCrearRol } from "@app/shared/utils/base-form-crear-rol";
import { RolesService } from "../../../services/roles.service";

enum Action {
    NEW='new'
  }
  
  @Component({
    selector: 'app-modal',
    templateUrl: './modal-crear-rol.component.html',
    styleUrls: ['./modal-crear-rol.component.scss']
  })
  
  export class ModalCrearRolComponent implements OnInit {
    actionTODO = Action.NEW;
    hide = true;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public rolForm: BaseFormCrearRol,
      private rolSvc: RolesService
    ) { }
  
    ngOnInit(): void {
      this.rolForm.baseFormCrearRol.reset();
    }
  
    onSaveNuevo(): void {
      const formValue = this.rolForm.baseFormCrearRol.value;

      if(this.actionTODO === Action.NEW){
        this.rolSvc.new(formValue).subscribe( res => {
          this.rolSvc.filter('Register click');
        })
      } 
    }
  
    checkField(field:string): boolean {
     return this.rolForm.isValidField(field);
    }
  }