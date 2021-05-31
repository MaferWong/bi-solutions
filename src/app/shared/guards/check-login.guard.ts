import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}
  canActivate():Observable<boolean> {
    return this.authSvc.user$.pipe(
      take(1),
      map((user: UserResponse) => (!user ? true : false))
    );
  }
}