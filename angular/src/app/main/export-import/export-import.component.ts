import { Component, Injector, OnInit } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  ExportImportInput,
  ExportImportPagedResult,
  ExportImportService,
  GetAllExportImportDto,
  GetAllExportImportPagedResult,
  ProductGetAllDto,
  ProductServiceProxy,
  StorageProductDetail,
} from "@shared/service-proxies/service-proxies";
import { throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

class PagedExportImportRequestDto extends PagedRequestDto {
  keyword: string;
  storageCode: string;
  dateTime: Date[];
  orderStatus: number;
}

@Component({
  selector: "app-export-import",
  templateUrl: "./export-import.component.html",
  styleUrls: ["./export-import.component.css"],
  animations: [appModuleAnimation()],
})
export class ExportImportComponent extends PagedListingComponentBase<GetAllExportImportDto> {
  exportImports: GetAllExportImportDto[];
  keyword = "";
  storageCode = "";
  orderStatus = 1;
  nameOfReciever = "";
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
    this._productService.getStorageProduct().subscribe((val) => {
      this.getStorage = val;
      this.storageCode = val[val.length - 1].storageCode;
    });
  }

  list(
    request: PagedExportImportRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    // throw new Error('Method not implemented.');
    request.keyword = this.keyword;
    request.orderStatus = this.orderStatus;
    setTimeout(() => {
      request.storageCode = this.storageCode;
      request.dateTime = this.bsInlineRangeValue;

      this._exportImportService
        .getAll(
          request.keyword,
          request.storageCode,
          request.dateTime,
          request.orderStatus,
          request.skipCount,
          request.maxResultCount
        )
        .pipe(
          finalize(() => {
            finishedCallback();
          })
        )
        .subscribe((result: GetAllExportImportPagedResult) => {
          this.exportImportList = result.items;
          this.showPaging(result, pageNumber);
        });
    }, 500);
  }
  delete(entity: GetAllExportImportDto): void {
    this.swal
      .fire({
        title: "Bạn có chắc?",
        text: "Hủy đơn",
        showCancelButton: true,
        confirmButtonColor: this.confirmButtonColor,
        cancelButtonColor: this.cancelButtonColor,
        cancelButtonText: "Hủy",
        confirmButtonText: "Hủy đơn",
        reverseButtons: this.ReverseButtons,
        icon: "warning",
      })
      .then((result) => {
        if (result.value) {
          let input = new ExportImportInput();
          input.exportImportCode = entity.exportImportCode;
          input.orderStatus = 3;
          this._exportImportService.updateOrder(input).subscribe(
            () => {
              this.notify.success(this.l("Cập nhật thành công"));
              this.refresh();
            },
            () => {}
          );
        }
      });
  }

  finishOrder(entity: GetAllExportImportDto): void {
    this.swal
      .fire({
        title: "Bạn có chắc?",
        text: "Hoàn thành đơn",
        showCancelButton: true,
        confirmButtonColor: this.confirmButtonColor,
        cancelButtonColor: this.cancelButtonColor,
        cancelButtonText: "Hủy",
        confirmButtonText: "hoàn thành",
        reverseButtons: this.ReverseButtons,
        icon: "warning",
      })
      .then((result) => {
        if (result.value) {
          let input = new ExportImportInput();
          input.exportImportCode = entity.exportImportCode;
          input.orderStatus = 2;
          this._exportImportService.updateOrder(input).subscribe(
            () => {
              this.notify.success(this.l("Cập nhật thành công"));
              this.refresh();
            },
            () => {}
          );
        }
      });
  }
}
