import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "@app/material.module";
import { ReportesRoutingModule } from "./reportes-routing.module";
import { ReportesComponent } from "./reportes.component";

@NgModule({
    declarations: [
      ReportesComponent
    ],
    imports: [
      CommonModule,
      ReportesRoutingModule,
      MaterialModule
    ]
  })
  export class ReportesModule { }