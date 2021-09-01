import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalReporteComponent } from '../components/modal/modal-reporte.component';
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
  constructor(private reporteSvc: ReportesService, private dialog: MatDialog ) { }

  ngOnInit(): void {
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
      .subscribe((res) => {window.alert(res.message)
      });
    }
  }

  onOpenModal(reporte = {}): void {
    console.log('Reporte->', reporte);
    this.dialog.open(ModalReporteComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: {title: 'Nuevo Reporte', reporte},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
