import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormLogin } from '@app/shared/utils/base-form-login';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor (
    private authSvc: AuthService,
    private router: Router,
    public loginForm: BaseFormLogin
    ) { }

  ngOnInit(): void {
    this.loginForm.baseFormLogin.reset();
    this.loginForm.baseFormLogin.get('login_usuario_rol').setValidators(null);
    this.loginForm.baseFormLogin.get('login_usuario_rol').updateValueAndValidity();
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe();
   }

  onLogin(): void {
    if(this.loginForm.baseFormLogin.invalid) {
      return;
    }
    
    const fromValue = this.loginForm.baseFormLogin.value;
    this.subscription.add(
    this.authSvc.login(fromValue).subscribe( res => {
      if(res) {
        this.router.navigate(['home']);
      }
    })
    );
  }

  checkField(field:string): boolean {
    return this.loginForm.isValidField(field);
  }
}