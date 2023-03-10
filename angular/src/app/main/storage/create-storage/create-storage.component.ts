import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { PermissionDto, StorageInput, StorageServiceProxy } from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.css'],
  // animations: [appModuleAnimation]
})
export class CreateStorageComponent extends AppComponentBase implements OnInit {
  saving = false;
  storage = new StorageInput();
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _storageService: StorageServiceProxy
  ) { 
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;
    
    const storage = new StorageInput();
    
    this._storageService.createStorage(storage).subscribe(
      () => {
        this.notify.info(this.l('Saved Successfully'));
        this.onSave.emit();
        this._router.navigate(['app/storage']);
      },
      () => {
        this.saving = false;
      }
    )
  }
}
