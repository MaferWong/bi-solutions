import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Roles } from '@app/shared/models/rol.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalCrearRolComponent } from '../components/modal/modal-crear-rol/modal-crear-rol.component';
import { ModalEditarRolComponent } from '../components/modal/modal-editar-rol/modal-editar-rol.component';


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
  constructor(private rolSvc: RolesService, private dialog: MatDialog ) {
    this.rolSvc.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshDataRol();
    })
   }

  ngOnInit(): void {
    this.refreshDataRol();
  }

  refreshDataRol() {
    this.rolSvc.getAll().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onDelete(rol_id: number): void {
    if(window.confirm('¿Está seguro de que desea eliminar este rol?')){
      this.rolSvc.delete(rol_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.rolSvc.filter('Register click');
        console.log('Eliminar', res);
        window.alert(res.message);
      });
      this.refreshDataRol();
    }
  }

  onCreateModal(rol = {}): void{
    console.log('Rol->', rol);
    this.dialog.open(ModalCrearRolComponent, {
      height: '300px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Nuevo Rol', rol},
    });
  }

  onEditModal(rol = {}): void {
    console.log('Rol->', rol);
    this.dialog.open(ModalEditarRolComponent, {
      height: '300px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Actualizar Rol', rol},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

