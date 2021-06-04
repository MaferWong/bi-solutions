import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserResponse } from '@shared/models/user.interface';

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
    .subscribe((user: UserResponse) => {
      this.isUser = user?.role;
    });
  }

  onExit(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }
}
