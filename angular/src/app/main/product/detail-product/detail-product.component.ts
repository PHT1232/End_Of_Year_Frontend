import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { PermissionDto, ProductOutputDto, ProductGetAllDto, StorageProductDetail, CategoryProduct, SubcategoryProduct, ProductServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  animations: [appModuleAnimation()]
})
export class DetailProductComponent extends AppComponentBase implements OnInit {
  saving = false;
  id: number;
  products = new ProductOutputDto();
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  isCollapsed = true;
  isCategoryCodeExist = false;
  categoryCode = '0';
  productList: ProductGetAllDto[] = [];
  getStorage: StorageProductDetail[] = [];
  getCategory: CategoryProduct[] = [];
  getSubcategorycode: SubcategoryProduct[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private router: ActivatedRoute,
    private _productService: ProductServiceProxy,
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
        this.products.subCategoryId = result.subCategoryId;
        this.products.storages = result.storages;
      });
      this.isCategoryCodeExist = true;
  }

  Cancel(): void {
    this._router.navigate(['app/product']);
  }
}
