import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reporte } from "@app/shared/models/reporte.interface";
import { environment } from "@env/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class ReportesService {
  
    constructor(private Http: HttpClient) { }
  
    getAll(): Observable<Reporte[]> {
      return this.Http
      .get<Reporte[]>(`${environment.API_URL}/reporte`)
      .pipe(catchError(this.handlerError));
    }
  
    getById(reporteId: number): Observable<Reporte> {
      return this.Http.get<any>(`${environment.API_URL}/reporte/${reporteId}`) 
      .pipe(catchError(this.handlerError)); 
    }
  
    new(reporte:Reporte): Observable<Reporte> {
      return this.Http.post<Reporte>(`${environment.API_URL}/reporte`, reporte)
      .pipe(catchError(this.handlerError));
    }
  
    update(reporteId: number, reporte:Reporte): Observable<Reporte> {
      return this.Http.put<Reporte>(`${environment.API_URL}/reporte/${reporteId}`, reporte)
      .pipe(catchError(this.handlerError)); 
    }
  
    delete(reporteId: number): Observable<any> {
      return this.Http.delete<Reporte>(`${environment.API_URL}/reporte/${reporteId}`)
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