import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { ExportImportPagedResult, ExportImportService, GetAllExportImportDto, GetAllExportImportPagedResult, ProductGetAllDto, ProductServiceProxy, StorageProductDetail } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

class PagedExportImportRequestDto extends PagedRequestDto {
  keyword: string;
  storageCode: string;
  dateTime: Date[];
  orderStatus: number;
}

@Component({
  selector: 'app-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.css'],
  animations: [appModuleAnimation()]
})
export class ExportImportComponent extends PagedListingComponentBase<GetAllExportImportDto> {
  exportImports: GetAllExportImportDto[];
  keyword = '';
  storageCode = 'DN';
  orderStatus = 1;
  nameOfReciever = '';
  bsInlineRangeValue: Date[];
  exportImportList: GetAllExportImportDto[] = [];
  getStorage: StorageProductDetail[] = [];
  totalCount: number;

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _exportImportService: ExportImportService
  ) { 
    super(injector);
    this._productService.getStorageProduct().subscribe(val => {
      this.getStorage = val;
    });
  }

  list(request: PagedExportImportRequestDto, pageNumber: number, finishedCallback: Function): void {
    // throw new Error('Method not implemented.');
    request.keyword = this.keyword;
      request.storageCode = this.storageCode;
      request.orderStatus = this.orderStatus;
    setTimeout(() => {
      
      request.dateTime = this.bsInlineRangeValue;

      this._exportImportService
      .getAll(request.keyword, request.storageCode, request.dateTime, request.orderStatus, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      ).subscribe((result: GetAllExportImportPagedResult) => {
        this.exportImportList = result.items;
        this.showPaging(result, pageNumber);
      });
    },300);
  }
  delete(entity: GetAllExportImportDto): void {
    // throw new Error('Method not implemented.');
  }
}
