import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '@app/shared/models/usuario.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private Http: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.Http
    .get<Usuario[]>(`${environment.API_URL}/usuario`)
    .pipe(catchError(this.handlerError));
  }

  getById(usuario_id: number): Observable<Usuario> {
    return this.Http.get<any>(`${environment.API_URL}/usuario/${usuario_id}`) 
    .pipe(catchError(this.handlerError)); 
  }

  new(usuario:Usuario): Observable<Usuario> {
    return this.Http.post<Usuario>(`${environment.API_URL}/usuario`, usuario)
    .pipe(catchError(this.handlerError));
  }

  update(usuario_id: number, usuario:Usuario): Observable<Usuario> {
    return this.Http.put<Usuario>(`${environment.API_URL}/usuario/${usuario_id}`, usuario)
    .pipe(catchError(this.handlerError)); 
  }

  delete(usuario_id: number): Observable<any> {
    return this.Http.delete<Usuario>(`${environment.API_URL}/usuario/${usuario_id}`)
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
