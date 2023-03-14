import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryInput, CategoryServiceProxy, PermissionDto } from '@shared/service-proxies/service-proxies';
import { FormArray, FormControl } from '@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateCategoryComponent extends AppComponentBase implements OnInit {
  saving = false;
  category = new CategoryInput();
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  subCategoryFormArray = new FormArray([]);

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _categoryService: CategoryServiceProxy
  ) { 
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    const categoryAdd = new CategoryInput();
    categoryAdd.categoryCode = this.category.categoryCode;
    categoryAdd.categoryName = this.category.categoryName;
    categoryAdd.description = this.category.description;
    categoryAdd.subCategories = [];
    this.subCategoryFormArray.controls.forEach(element => {
      categoryAdd.subCategories.push(element.value.toString());
    });
    
    this._categoryService.create(categoryAdd).subscribe(
      () => {
        this.notify.success(this.l('Thêm mới thành công'));
        this.onSave.emit();
        this._router.navigate(['app/category']);
      },
      () => {
        this.saving = false;
      }
    )
  }

  Cancel(): void {
    this._router.navigate(['app/category']);
  }

  AddItem(): void {
    this.subCategoryFormArray.push(new FormControl(''));
  }

  RemoveItem(index: number) {
    this.subCategoryFormArray.removeAt(index);
  }
}
