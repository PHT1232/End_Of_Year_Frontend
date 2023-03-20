import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryInput, CategoryServiceProxy, PermissionDto } from '@shared/service-proxies/service-proxies';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-create-export-import',
  templateUrl: './create-export-import.component.html',
  styleUrls: ['./create-export-import.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateExportImportComponent extends AppComponentBase implements OnInit {
  saving = false;
  userCode = '0';
  isCollapsed = false;
  formArray = new FormArray([]);

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

  }

  Cancel(): void {
    this._router.navigate(['app/exportimport']);
  }

  checkFormValid(): boolean {
    return false;
  }

  getRandomCode() {
    
  }
  
  getCustomer() {

  }

  AddItem() {
    // if (this.formArray.length) {
      // this.storageSelect[this.storageFormArray.length] = new StorageProductDetail();
      this.formArray.push(new FormGroup({
        storageOfFormArray: new FormControl(''),
        ProductOfFormArray: new FormControl(''),
        quantity: new FormControl(''),
        location: new FormControl(''),
      }));
    // }
  }
}
