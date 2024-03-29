import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryInput, CategoryServiceProxy, CustomerDto, ExportImportInput, ExportImportPagedResult, ExportImportProductDto, ExportImportService, LookUpTable, PermissionDto, ProductServiceProxy, StorageProductDetail } from '@shared/service-proxies/service-proxies';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';

class PagedProductRequestDto extends PagedRequestDto {
  storageCode: string;
  IsInsert: boolean;
}

class InitialProductQuantity {
  id: string;
  quantity: number;
}

@Component({
  selector: 'app-return-import',
  templateUrl: './return-import.component.html',
  styleUrls: ['./return-import.component.css'],
  animations: [appModuleAnimation()]
})
export class ReturnImportComponent extends AppComponentBase implements OnInit {
  saving = false;
  isCollapsed = false;
  exportImport = new ExportImportInput();
  storageCode = '0';
  storageCodeInput = '0';
  keyword: string;
  getStorage: StorageProductDetail[] = [];
  orderType = 1;
  products1: ExportImportProductDto[] = [];
  user: LookUpTable[] = [];
  request: PagedProductRequestDto;
  pageSize = 5;
  pageNumber = 1;
  totalPages = 1;
  skipCount = (1 - 1) * this.pageSize;
  isTrue = true;
  quantityCheck: boolean[] = [];
  totalItems: number;
  initialProductQuantity: InitialProductQuantity[] = [];
  isExist = false;
  errorMessage = 'Không được trùng kho';

  @Output() onsave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _exportImport: ExportImportService,
    private _productservice: ProductServiceProxy
  ) {
    super(injector);
    this._productservice.getStorageProduct().subscribe(val => {
      this.getStorage = val;
      // this.storageCode = val[val.length - 1].storageCode;
    });

    setTimeout(() => {
      this._exportImport.getProduct(this.storageCode, true, this.skipCount, this.pageSize)
      .subscribe((result: ExportImportPagedResult) => {
        this.products1 = result.items;
        this.showPaging(result, this.pageNumber);
        for (let i = 0; i < this.products1.length; i++) {
          this.quantityCheck[i] = true;
          let productQuantity = new InitialProductQuantity();
          productQuantity.id = this.products1[i].productId;
          productQuantity.quantity = this.products1[i].quantity;
          this.initialProductQuantity.push(productQuantity);
        }
      });
    }, 300);
   
    this._exportImport.getUser()
    .subscribe(val => {
      this.user = val;
    });

    this.exportImport.products = [];
    this.exportImport.orderCreator = 0;
  }

  ngOnInit(): void {
  }

  save2(): void {
    let totalPrice = 0; 
    this.saving = true;
    this.exportImport.storageId = this.storageCode;
    this.exportImport.storageInputId = this.storageCodeInput;
    this.exportImport.products.forEach(element => {
      totalPrice += element.finalPrice;
    });

    this.exportImport.totalPrice = totalPrice;
    this.exportImport.orderStatus = 1;
    this.exportImport.orderType = 3;
    this._exportImport.create(this.exportImport).subscribe(
      () => {
        this.notify.success(this.l('Tạo đơn thành công'));
        this.onsave.emit();
        this._router.navigate(['app/exportimport']);
      },
      () => {
        this.saving = false;
      }
    )
  }

  public showPaging(result: ExportImportPagedResult, pageNumber: number): void {
    this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

    this.totalItems = result.totalCount;
    this.pageNumber = pageNumber;
}

  Cancel(): void {
    this._router.navigate(['app/exportimport']);
  }

  checkFormValid(): boolean {
    // this.isTrue = true;

    if (this.exportImport.products.length === 0
      || this.exportImport.exportImportCode === ''
      || this.exportImport.orderCreator === 0
      || this.storageCodeInput === '0'
      ) {
      return true;
    }

    for (let i = 0; i < this.quantityCheck.length; i++) {
      if (this.quantityCheck[i] === false) {
        this.isTrue = false;
        return false;
      }
    }

    // if (this.isTrue) {
    //   this.isTrue = true;
      return true;
    // }
  }

  getRandomCode() {
    this._exportImport.getRandomCode()
    .subscribe(val => {
      this.exportImport.exportImportCode = val;
    });
  }
  
  changeQuantity(productTemp: ExportImportProductDto) {
    // this.products1.forEach((element, index) => {
    //   if (element.productId === productTemp.productId) {
    //     this.initialProductQuantity.forEach(element1 => {
    //       if (element1.id === element.productId) {
    //         if (productTemp.quantity >= element1.quantity) {
    //           this.products1[index].quantity = element1.quantity;
    //           this.products1[index].finalPrice = element1.quantity * productTemp.price;
    //         } else {
    //           this.products1[index].finalPrice = productTemp.quantity * productTemp.price;
    //         }
    //       }
    //     });
    //   }
    // });
    this.exportImport.products.forEach((element, index) => {
      if (element.productId === productTemp.productId) {
        this.exportImport.products[index].quantity = productTemp.quantity;
        this.exportImport.products[index].finalPrice = productTemp.quantity * productTemp.price;
      }
    });
  }

  AddItem(productTemp: ExportImportProductDto, index: number) {
    if (this.quantityCheck[index] === false) {
      var indexToSlice = 0;
      this.exportImport.products.forEach((element, index) => {
        if (element.productId === productTemp.productId) {
          indexToSlice = index; 
        }
      });
      if (this.exportImport.products.length === 1) {
        this.exportImport.products = [];
      } else {
        // delete this.exportImport.products1[indexToSlice];
        this.exportImport.products.slice(indexToSlice);
      }
      this.quantityCheck[index] = true;
    } else {
      this.exportImport.products.push(productTemp);
      this.quantityCheck[index] = false;
    }
  }
  
  getDataPage(page: number) {
    this.exportImport.products = [];
    this.quantityCheck = [];
    this.skipCount = (page - 1) * this.pageSize;
    this._exportImport.getProduct(this.storageCode, true, this.skipCount, this.pageSize)
    .subscribe((result: ExportImportPagedResult) => {
      this.products1 = result.items;
      this.showPaging(result, this.pageNumber);
      for (let i = 0; i < this.products1.length; i++) {
        this.quantityCheck[i] = true;
      }
    });
  }

  getProductPage() {

  }
}
