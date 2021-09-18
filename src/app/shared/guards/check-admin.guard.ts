import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CheckAdminGuard implements CanActivateChild {

  constructor(private authSvc: AuthService, private router: Router) {}

  canActivateChild(): boolean {
    if(this.authSvc.isAdmin == true){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
