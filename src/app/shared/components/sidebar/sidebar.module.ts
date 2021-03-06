import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MaterialModule} from '@app/material.module';
import { UtilsService } from '@app/shared/services/utils.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    UtilsService
  ]
})
export class SidebarModule { }
