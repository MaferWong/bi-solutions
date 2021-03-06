import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";

const myModules = [
    MatToolbarModule, 
    MatSidenavModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatListModule, 
    MatIconModule, 
    MatInputModule, 
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule
];

@NgModule({
    imports: [...myModules],
    exports: [...myModules],
})

export class MaterialModule {}