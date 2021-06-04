import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@app/shared/services/utils.service';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { UserResponse } from '@app/shared/models/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isUser = null;
  
  private destroy$ = new Subject<any>();

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: UserResponse) => {
      this.isUser = user?.role;
    });
  }

}
