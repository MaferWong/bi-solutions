import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@app/material.module";
import { RolesRoutingModule } from "./roles-routing.module";
import { RolesComponent } from "./roles.component";

@NgModule({
    declarations: [
      RolesComponent
    ],
    imports: [
      CommonModule,
      RolesRoutingModule,
      MaterialModule
    ]
  })
  export class RolesModule { }