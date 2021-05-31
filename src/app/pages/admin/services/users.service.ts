import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private Http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.Http
    .get<User[]>(`${environment.API_URL}/users`)
    .pipe(catchError(this.handlerError));
  }

  getById(userId: number): Observable<User> {
    return this.Http.get<any>(`${environment.API_URL}/users/${userId}`) 
    .pipe(catchError(this.handlerError)); 
  }

  new(user:User): Observable<User> {
    return this.Http.post<User>(`${environment.API_URL}/users`, user)
    .pipe(catchError(this.handlerError));
  }

  update(userId: number, user:User): Observable<User> {
    return this.Http.patch<User>(`${environment.API_URL}/users/${userId}`, user)
    .pipe(catchError(this.handlerError)); 
  }

  delete(userId: number): Observable<any> {
    return this.Http.delete<User>(`${environment.API_URL}/users/${userId}`)
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
