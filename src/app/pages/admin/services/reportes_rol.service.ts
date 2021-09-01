import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReporteRol } from "@app/shared/models/reporte_rol.interface";
import { environment } from "@env/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class ReporteRolService {
  
    constructor(private Http: HttpClient) { }
  
    getAll(): Observable<ReporteRol[]> {
      return this.Http
      .get<ReporteRol[]>(`${environment.API_URL}/reporte_rol`)
      .pipe(catchError(this.handlerError));
    }
  
    getById(reporteRolId: number): Observable<ReporteRol> {
      return this.Http.get<any>(`${environment.API_URL}/reporte_rol/${reporteRolId}`) 
      .pipe(catchError(this.handlerError)); 
    }
  
    new(reporteRol:ReporteRol): Observable<ReporteRol> {
      return this.Http.post<ReporteRol>(`${environment.API_URL}/reporte_rol`, reporteRol)
      .pipe(catchError(this.handlerError));
    }
  
    update(reporteRolId: number, reporteRol:ReporteRol): Observable<ReporteRol> {
      return this.Http.put<ReporteRol>(`${environment.API_URL}/reporte_rol/${reporteRolId}`, reporteRol)
      .pipe(catchError(this.handlerError)); 
    }
  
    delete(reporteRolId: number): Observable<any> {
      return this.Http.delete<ReporteRol>(`${environment.API_URL}/reporte_rol/${reporteRolId}`)
      .pipe(catchError(this.handlerError)); 
    }
  
    handlerError(error): Observable<never> {
      let errorMessage = 'Unknown Error';
      if(error) {
        errorMessage = `Error ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
  }