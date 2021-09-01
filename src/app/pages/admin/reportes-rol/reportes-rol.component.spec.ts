import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesRolComponent } from './reportes-rol.component';

describe('ReportesRolComponent', () => {
  let component: ReportesRolComponent;
  let fixture: ComponentFixture<ReportesRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
