import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryInput, CategoryProduct, CategoryServiceProxy, PermissionDto, ProductGetAllDto, ProductInputDto, ProductServiceProxy, ProductStorageDto, StorageProductDetail, SubcategoryProduct } from '@shared/service-proxies/service-proxies';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateProductComponent extends AppComponentBase implements OnInit {
  saving = false;
  storageCode = '';
  categoryCode = '0';
  subcategoryCode = 0;
  productList: ProductGetAllDto[] = [];
  getStorage: StorageProductDetail[] = [];
  getCategory: CategoryProduct[] = [];
  getSubcategorycode: SubcategoryProduct[] = [];
  isCategoryCodeExist = false;
  totalCount: number;
  storageFormArray = new FormArray([]);
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  products = new ProductInputDto();
  storageSelect: ProductStorageDto[] = [];
  quantity: number;
  location: string;
  isTrue = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _router: Router,
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._productService.getStorageProduct().subscribe(val => {
        this.getStorage = val;
    });

    this._productService.getCategoryProduct().subscribe(val => {
        this.getCategory = val;
    });
    this.products.storages = [];
  }

  save(): void {
    this.saving = true;

    const product = new ProductInputDto();
    product.productCode = this.products.productCode;
    product.productName = this.products.productName;
    product.productDescription = this.products.productDescription;
    product.productDetail = this.products.productDetail;
    product.categoryId = this.categoryCode;
    product.unit = this.products.unit;
    product.price = this.products.price;  
    if (this.products.subCategoryId === '0')
      product.subCategoryId = '0';
    else
      product.subCategoryId = this.products.subCategoryId;
      
    product.storages = this.storageSelect;
    this._productService.create(product).subscribe(
      () => {
        this.notify.success(this.l('Thêm mới thành công'));
        this.onSave.emit();
        this._router.navigate(['app/product']);
      },
      () => {
        this.saving = false;
      }
    )
  }

  getSubcategory() {
    if (this.categoryCode !== '0') {
      this._productService.getSubcategoryProduct(this.categoryCode).subscribe(val => {
        if (val.length === 0) {
          this.products.subCategoryId = '0';
          this.isCategoryCodeExist = false;
        } else {
          this.products.subCategoryId = '0';
          this.isCategoryCodeExist = true;
        }
        this.getSubcategorycode = val;
      });
      return;
    }
    this.products.subCategoryId = '0';
    this.isCategoryCodeExist = false;
  }

  AddItem() {
    if (this.storageFormArray.length < this.getStorage.length) {
      this.storageSelect[this.storageFormArray.length] = new ProductStorageDto();
      this.storageFormArray.push(new FormGroup({
        storageOfFormArray: new FormControl(''),
        quantity: new FormControl(''),
        location: new FormControl(''),
      }));
    }
  }

  Cancel(): void {
    this._router.navigate(['app/product']);
  }

  RemoveItem(index: number) {
    this.storageFormArray.removeAt(index);
    this.storageSelect.slice(index);  
  }

  checkFormValid(): boolean {
    // console.log('product code: ' + this.products.productCode);
    // console.log('product Name: ' + this.products.productName);
    // console.log('product price: ' + this.products.price);
    // this.storageSelect.forEach(element => {
    //     console.log('product select code: ' + element.storageCode)
    //     console.log('product select quantity: ' + element.productQuantity)
    //     console.log('product select location: ' + element.productLocation)
    // });
    // console.log('product length: ' + this.storageSelect.length);
    if (this.products.productCode === undefined 
      || this.products.productName === undefined 
      || this.products.price === undefined 
      || this.storageSelect.length === 0
      || this.categoryCode === '0' 
      || this.products.unit === ''
      || this.products.productCode === '' 
      || this.products.productName === '') {
      return true;
    }
    this.storageSelect.forEach(element => {
      if (element.storageCode === undefined || element.productQuantity === undefined || element.productLocation === undefined) {
        this.isTrue = true;
      }
    });
    if (this.isTrue) {
      this.isTrue = false
      return true;
    }
  }

}
