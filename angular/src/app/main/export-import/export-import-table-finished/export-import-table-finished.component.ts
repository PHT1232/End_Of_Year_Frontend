import { Component, Injector, OnInit } from '@angular/core';
import { ExportImportComponent } from '../export-import.component';
import { ExportImportService, ProductServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-export-import-table-finished',
  templateUrl: './export-import-table-finished.component.html',
  styleUrls: ['./export-import-table-finished.component.css']
})
export class ExportImportTableFinishedComponent extends ExportImportComponent implements OnInit {

  constructor(
    injector: Injector,
    private _productService1: ProductServiceProxy,
    private _exportImportService1: ExportImportService
  ) {    
      super(injector, _productService1, _exportImportService1);
 }

  ngOnInit(): void {
  }

}
