import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CategoryProduct, ProductGetAllDto, ProductGetAllPagedResultDto, ProductServiceProxy, StorageProductDetail, SubcategoryProduct } from '@shared/service-proxies/service-proxies';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

class PagedProductRequestDto extends PagedRequestDto {
  keyword: string;
  storageCode: string;
  categoryCode: string;
  subcategoryCode: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [appModuleAnimation()]
})
export class ProductComponent extends PagedListingComponentBase<ProductGetAllDto> {
  keyword = '';
  storageCode = '';
  categoryCode = '0';
  subcategoryCode = 0;
  productList: ProductGetAllDto[] = [];
  getStorage: StorageProductDetail[] = [];
  getCategory: CategoryProduct[] = [];
  getSubcategorycode: SubcategoryProduct[] = [];
  isCategoryCodeExist = false;
  totalCount: number;

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy
  ) { 
    super(injector);
    this._productService.getStorageProduct().subscribe(val => {
      this.getStorage = val;
    });

    this._productService.getCategoryProduct().subscribe(val => {
        this.getCategory = val;
    });
  }

  list(request: PagedProductRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;
    request.storageCode = this.storageCode;
    request.categoryCode = this.categoryCode;
    request.subcategoryCode = this.subcategoryCode; 
    
    console.log(request.keyword);
    console.log(request.storageCode);
    console.log(request.categoryCode);
    console.log(request.subcategoryCode);

    this._productService
      .getAll(request.keyword, request.storageCode, request.categoryCode, request.subcategoryCode, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ProductGetAllPagedResultDto) => {
        this.productList = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  delete(entity: ProductGetAllDto): void {
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: 'Sản phẩm sẽ bị xóa',
      showCancelButton: true,
      confirmButtonColor: this.confirmButtonColor,
      cancelButtonColor: this.cancelButtonColor,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      reverseButtons: this.ReverseButtons,
      icon: 'warning',
    })
    .then((result) => {
      if (result.value) {
        this._productService.delete(entity.productCode).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: () => {
              abp.notify.success(this.l('Xóa thành công'));
              this.refresh();
            },
            error: (error) => {
              console.log(error);
              if (error.error && error.error.message) {
                this.notify.error(error.error.message);
              }
            },
            complete() {
              
            },
          })
      }
    });
  }

  getSubcategory() {
    if (this.categoryCode !== '0') {
      this._productService.getSubcategoryProduct(this.categoryCode).subscribe(val => {
          this.getSubcategorycode = val
      });
      this.isCategoryCodeExist = true;
    } else if (this.categoryCode === '0') {
      this.categoryCode = '0';
      this.isCategoryCodeExist = false;
    }
  }
}
