import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalReporteRolComponent } from '../components/modal/modal-reporte_rol.component';
import { ReporteRolService } from '../services/reportes_rol.service';

@Component({
  selector: 'app-reportes-rol',
  templateUrl: './reportes-rol.component.html',
  styleUrls: ['./reportes-rol.component.scss']
})

export class ReportesRolComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'rol_id', 'reporte_id', 'acciones'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private reporteRolSvc: ReporteRolService, private dialog: MatDialog ) { }

  ngOnInit(): void {
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
      .subscribe((res) => {window.alert(res.message)
      });
    }
  }

  onOpenModal(reportesRol = {}): void {
    console.log('ReporteRol->', reportesRol);
    this.dialog.open(ModalReporteRolComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Nueva Asignación', reportesRol},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
