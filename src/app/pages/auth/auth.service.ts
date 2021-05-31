import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { UserResponse, User } from '@shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<UserResponse>(null);

  constructor(private http: HttpClient, private router: Router) { 
    this.checkToken();
  }

  get user$(): Observable<any> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(
      `${environment.API_URL}/auth/login`, 
      authData
      ).pipe(
        map((user:UserResponse) => {
          this.saveLocalStorage(user);
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

  private saveLocalStorage(user:UserResponse): void {
  const {userId, message, ...rest} = user;
  localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'En error ocurred retrieving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}