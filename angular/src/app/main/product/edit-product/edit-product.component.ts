import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryInput, CategoryProduct, CategoryServiceProxy, PermissionDto, ProductGetAllDto, ProductInputDto, ProductOutputDto, ProductServiceProxy, ProductStorageDto, StorageProductDetail, SubcategoryProduct } from '@shared/service-proxies/service-proxies';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  animations: [appModuleAnimation()]
})
export class EditProductComponent extends AppComponentBase implements OnInit {
  id: string;
  saving = false;
  categoryCode = '0';
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
  products = new ProductOutputDto();
  storageSelect: StorageProductDetail[] = [];
  quantity: number;
  location: string;
  isTrue = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private router: ActivatedRoute,
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
    this.products.subCategoryId = '0';
    this.router.params.subscribe(params => {
      this.id = params['id']
    });
    
    this._productService.getProduct(this.id.toString())
      .subscribe((result: ProductOutputDto) => {
        this.products.productCode = result.productCode;
        this.products.productName = result.productName;
        this.products.productDescription = result.productDescription;
        this.products.productDetail = result.productDetail;
        this.products.price = result.price;
        this.products.unit = result.unit;
        this.categoryCode = result.categoryId;
        this._productService.getSubcategoryProduct(result.categoryId).subscribe(val => {
          this.getSubcategorycode = val;
        });
        if (result.subCategoryId === null) {
          this.products.subCategoryId = '0';
        } else {
          this.products.subCategoryId = result.subCategoryId;
        }
        // this.products.storages = result.storages;
        this.storageSelect = result.storages;
        result.storages.forEach(element => {
          this.storageFormArray.push(new FormGroup({
            storageOfFormArray: new FormControl(''),
            quantity: new FormControl(''),
            location: new FormControl(''),
          }));
        });
      });
      this.isCategoryCodeExist = true;
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
      product.subCategoryId = null;
    else
      product.subCategoryId = this.products.subCategoryId;
    
    product.storages = this.storageSelect;
    this._productService.update(product).subscribe(
      () => {
        this.notify.success(this.l('Cập nhật thành công'));
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
      this.storageSelect[this.storageFormArray.length] = new StorageProductDetail();
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
    if (this.storageFormArray.length === 0) {
      this.storageSelect = [];  
    } else {
      this.storageSelect.slice(index);
    }
  }

  checkFormValid(): boolean {
    
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

    if (this.getSubcategorycode.length > 0 && this.products.subCategoryId === '0') {
      return true;
    }

    this.storageSelect.forEach(element => {
      if (element.storageCode === undefined || element.quantity === undefined || element.productLocation === undefined) {
        this.isTrue = true;
      }
    });
    if (this.isTrue) {
      this.isTrue = false
      return true;
    }
  }

}
