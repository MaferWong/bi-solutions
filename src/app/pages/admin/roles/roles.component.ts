import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalRolComponent } from '../components/modal/modal-rol.component';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RolesComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private rolSvc: RolesService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.rolSvc.getAll().subscribe((roles) => {
      this.dataSource.data = roles;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onDelete(rolId: number): void {
    if(window.confirm('¿Está seguro de que desea eliminar este rol?')){
      this.rolSvc.delete(rolId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {window.alert(res.message)
      });
    }
  }

  onOpenModal(rol = {}): void {
    console.log('Rol->', rol);
    this.dialog.open(ModalRolComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Nuevo Rol', rol},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

