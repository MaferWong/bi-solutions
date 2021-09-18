import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalCrearReporteRolComponent } from '../components/modal/modal-crear-reporte_rol/modal-crear-reporte_rol.component';
import { ModalEditarReporteRolComponent } from '../components/modal/modal-editar-reporte_rol/modal-editar-reporte_rol.component';
import { ReporteRolService } from '../services/reportes_rol.service';

@Component({
  selector: 'app-reportes-rol',
  templateUrl: './reportes-rol.component.html',
  styleUrls: ['./reportes-rol.component.scss']
})

export class ReportesRolComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private reporteRolSvc: ReporteRolService, private dialog: MatDialog ) {
    this.reporteRolSvc.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshDataReporteRol();
    })
   }

  ngOnInit(): void {
    this.refreshDataReporteRol();
  }

  refreshDataReporteRol() {
    this.displayedColumns = ['id', 'rol_id', 'rol_descripcion', 'reporte_id', 'reporte_descripcion', 'acciones'];
    this.reporteRolSvc.getAll().subscribe((reportesRol) => {
      this.dataSource.data = reportesRol;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onDelete(reporte_rolId: number): void {
    if(window.confirm('¿Está seguro de que desea eliminar esta asignación?')){
      this.reporteRolSvc.delete(reporte_rolId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.reporteRolSvc.filter('Register click');
        console.log('Eliminar', res);
        window.alert(res.message);
      });
      this.refreshDataReporteRol();
    }
  }

  onCreateModal(reportesRol = {}): void {
    console.log('ReporteRol->', reportesRol);
    this.dialog.open(ModalCrearReporteRolComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Nueva Asignación', reportesRol},
    });
  }

  onEditModal(reportesRol = {}): void {
    console.log('ReporteRol->', reportesRol);
    this.dialog.open(ModalEditarReporteRolComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Actualizar Asignación', reportesRol},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
