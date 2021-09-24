import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { LoginRespuesta } from '@app/shared/models/login.interface';
import { ReporteRol } from '@app/shared/models/reporte_rol.interface';
import { ReporteRolService } from './services/reportes_rol.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  RolId = null;
  isUser = null;
  isAdmin = false;
  allReporteRol: Array<ReporteRol>;
  selectedValue: string; 
  safeSrc: SafeResourceUrl;

  reportesByRolId: ReporteRol[];

  private destroy$ = new Subject<any>();

  constructor(private authSvc: AuthService, 
     private reporteRolSvc: ReporteRolService, private sanitizer: DomSanitizer ) { }

    ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: LoginRespuesta) => {
        this.isUser = user?.login_usuario_rol;
        this.RolId = user?.login_usuario_rol_id;
      });
      this.returnData();
    this.reportesByRolId = new Array<ReporteRol>();
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("");
    }

    returnData(): void {
   // this.allReporteRol = [];
    this.reporteRolSvc.getAll().subscribe((allReporteRol) => {
      this.allReporteRol = allReporteRol;
      console.log("todo",this.allReporteRol);
      this.ngOnChanges();
    });
    }

    ngOnChanges() {   
      //this.returnData();
      this.reportesByRolId = this.allReporteRol.filter( reporteRol => reporteRol.rol_id === this.RolId);
      console.log("byrol",this.reportesByRolId);
    }

    getValue() {
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedValue);
      console.log(this.selectedValue);
    }
}
