import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@app/shared/services/utils.service';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { LoginRespuesta } from '@app/shared/models/login.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isUser = null;
  isAdmin = false;

  private destroy$ = new Subject<any>();

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: LoginRespuesta) => {
      this.isUser = user?.login_usuario_rol;
    });
  }

}
