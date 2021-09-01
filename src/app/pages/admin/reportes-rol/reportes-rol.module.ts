import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@app/material.module";
import { ReportesRolRoutingModule } from "./reportes-rol-routing.module";
import { ReportesRolComponent } from "./reportes-rol.component";

@NgModule({
    declarations: [
      ReportesRolComponent
    ],
    imports: [
      CommonModule,
      ReportesRolRoutingModule,
      MaterialModule
    ]
  })
  export class ReportesRolModule { }