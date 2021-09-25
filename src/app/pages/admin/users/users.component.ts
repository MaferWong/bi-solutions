import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { ModalCrearUsuarioComponent } from '../components/modal/modal-crear-usuario/modal-crear-usuario.component';
import { ModalEditarUsuarioComponent } from '../components/modal/modal-editar-usuario/modal-editar-usuario.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private userSvc: UsuariosService, private dialog: MatDialog ) { 
    this.userSvc.listen().subscribe((m:any)=>{
      this.refreshDataUsuario();
    })
  }

  ngOnInit(): void {
    this.refreshDataUsuario();
  }

  refreshDataUsuario() {
    this.displayedColumns = ['id', 'nombre', 'correo', 'rol', 'rol_descripcion', 'acciones'];
    this.userSvc.getAll().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  onDelete(userId: number): void {
    if(window.confirm('¿Está seguro de que desea eliminar este usuario?')){
      this.userSvc.delete(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.userSvc.filter('Register click');
        window.alert(res.message);
      });
      this.refreshDataUsuario();
    }
  }

  onCreateModal(user = {}): void{
    this.dialog.open(ModalCrearUsuarioComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Nuevo Usuario', user},
    });
  }

  onEditModal(user = {}): void {
    this.dialog.open(ModalEditarUsuarioComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Actualizar Usuario', user},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
