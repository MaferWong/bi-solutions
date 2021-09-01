import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportesRolComponent } from "./reportes-rol.component";

const routes: Routes = [{ path: '', component: ReportesRolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRolRoutingModule { }