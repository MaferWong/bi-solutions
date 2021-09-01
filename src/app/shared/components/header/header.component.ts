import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LoginRespuesta } from '@app/shared/models/login.interface';
import { UtilsService } from '@app/shared/services/utils.service';
import { AuthService } from '@auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUser = null;
  /*isLogged = true;*/

  private destroy$ = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: LoginRespuesta) => {
     /* this.isLogged = false;*/
      this.isUser = user?.login_usuario_rol;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }
}
