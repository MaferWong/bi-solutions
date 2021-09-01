import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginRespuesta } from '@app/shared/models/login.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isUser = null;
  
  private destroy$ = new Subject<any>();

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: LoginRespuesta) => {
      this.isUser = user?.login_usuario_rol;
    });
  }

  onExit(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }
}
