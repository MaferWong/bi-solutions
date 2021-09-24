import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { LoginRespuesta, LoginSolicitud } from '@app/shared/models/login.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<LoginRespuesta>(null);
  isAdmin= false;
  isUser = null;

  constructor(private http: HttpClient, private router: Router) { 
    this.checkToken();
  }

  get user$(): Observable<any> {
    return this.user.asObservable();
  }

  get userValue(): LoginRespuesta {
    return this.user.getValue();
  }

  login(authData: LoginSolicitud): Observable<LoginRespuesta | void> {
    return this.http.post<LoginRespuesta>(
      `${environment.API_URL}/login`, 
      authData
      ).pipe(
        map((user:LoginRespuesta) => {
          this.saveLocalStorage(user);
          this.isUser = user?.login_usuario_rol;
          if(this.isUser == "Administrador de Sistema"){
              this.isAdmin=true;
          }
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      
      if (isExpired) {
      this.logout();
      } else {
        this.user.next(user);
      }
    }
  } 

  private saveLocalStorage(user:LoginRespuesta): void {
  const {message, ...rest} = user;
  localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'En error ocurred retrieving data';
    if (err) {
      //errorMessage = `Error: ${err.message}`;
      errorMessage = 'Verifique sus credenciales.';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}