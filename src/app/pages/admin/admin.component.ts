import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { LoginRespuesta } from '@app/shared/models/login.interface';
import { ReporteRol } from '@app/shared/models/reporte_rol.interface';
import { ReporteRolService } from './services/reportes_rol.service';

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
  
  public reportesByRolId: Array<ReporteRol>;

  private destroy$ = new Subject<any>();

  constructor(private authSvc: AuthService, 
     private reporteRolSvc: ReporteRolService, ) { }

  
    

    ngOnInit(): void {
    this.returnData();
    //console.log(this.allReporteRol);
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: LoginRespuesta) => {
        this.isUser = user?.login_usuario_rol;
        this.RolId = user?.login_usuario_rol_id;
        
      });
      if(this.allReporteRol == undefined){
        //console.log("valir");
      }else{
        this.ngOnChanges();
      }
      //console.log("reportesByRol",this.reportesByRolId);
      //this.filterData();
   /* this.reportesByRolId = this.allReporteRol.filter(reporteRol => reporteRol.rol_id === this.isRolId); debugger;
      console.log("reportesByRol",this.reportesByRolId);
      console.log(this.isRolId);*/
    }

    returnData(): void {
   // this.allReporteRol = [];
    this.reporteRolSvc.getAll().subscribe((allReporteRol) => {
      this.allReporteRol = allReporteRol;
      console.log(this.allReporteRol);

    });
    }
    ngOnChanges() {   
    
      console.log(this.allReporteRol);
      //this.returnData();
      this.reportesByRolId = this.allReporteRol.filter( reporteRol => reporteRol.rol_id === this.RolId.login_usuario_rol_id); 
      if (this.allReporteRol == undefined){
        this.ngOnChanges();
      }
      
    }
}
