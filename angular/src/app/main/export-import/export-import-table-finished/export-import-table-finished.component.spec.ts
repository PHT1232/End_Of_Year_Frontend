import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportImportTableFinishedComponent } from './export-import-table-finished.component';

describe('ExportImportTableFinishedComponent', () => {
  let component: ExportImportTableFinishedComponent;
  let fixture: ComponentFixture<ExportImportTableFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportImportTableFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportImportTableFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
