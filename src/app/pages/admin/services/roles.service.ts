import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Roles } from "@app/shared/models/rol.interface";
import { environment } from "@env/environment";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class RolesService {
  
    constructor(private Http: HttpClient) { }
  
    getAll(): Observable<Roles[]> {
      return this.Http
      .get<Roles[]>(`${environment.API_URL}/rol`)
      .pipe(catchError(this.handlerError));
    }
  
    getById(rol_id: number): Observable<Roles> {
      return this.Http.get<any>(`${environment.API_URL}/rol/${rol_id}`) 
      .pipe(catchError(this.handlerError)); 
    }
  
    new(rol:Roles): Observable<Roles> {
      return this.Http.post<Roles>(`${environment.API_URL}/rol`, rol)
      .pipe(catchError(this.handlerError));
    }
  
    update(rol_id: number, rol:Roles): Observable<Roles> {
      return this.Http.put<Roles>(`${environment.API_URL}/rol/${rol_id}`, rol)
      .pipe(catchError(this.handlerError)); 
    }
  
    delete(rol_id: number): Observable<any> {
      return this.Http.delete<Roles>(`${environment.API_URL}/rol/${rol_id}`)
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

    private _listeners = new Subject<any>();

    listen(): Observable<any>{
    return this._listeners.asObservable();
    }

    filter(filterBy: string){
    this._listeners.next(filterBy);
    }
  }