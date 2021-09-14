import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalCrearReporteComponent } from '../components/modal/modal-crear-reporte/modal-crear-reporte.component';
import { ModalEditarReporteComponent } from '../components/modal/modal-editar-reporte/modal-editar-reporte.component';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})

export class ReportesComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'descripcion', 'url', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private reporteSvc: ReportesService, private dialog: MatDialog ) {
    this.reporteSvc.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshDataReporte();
    })
   }

  ngOnInit(): void {
    this.refreshDataReporte();
  }

  refreshDataReporte() {
    this.reporteSvc.getAll().subscribe((reportes) => {
      this.dataSource.data = reportes;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onDelete(reporteId: number): void {
    if(window.confirm('¿Está seguro de que desea eliminar este reporte?')){
      this.reporteSvc.delete(reporteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.reporteSvc.filter('Register click');
        console.log('Eliminar', res);
        window.alert(res.message);
      });
      this.refreshDataReporte();
    }
  }

  onCreateModal(reporte = {}): void {
    console.log('Reporte->', reporte);
    this.dialog.open(ModalCrearReporteComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Nuevo Reporte', reporte},
    });
  }

  onEditModal(reporte = {}): void {
    console.log('Reporte->', reporte);
    this.dialog.open(ModalEditarReporteComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Actualizar Reporte', reporte},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
