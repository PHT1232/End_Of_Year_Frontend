import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { PermissionDto, StorageForUpdate, StorageInput, StorageOutPutDto, StorageServiceProxy } from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-storage',
  templateUrl: './detail-storage.component.html',
  styleUrls: ['./detail-storage.component.css'],
  animations: [appModuleAnimation()]
})
export class DetailStorageComponent extends AppComponentBase implements OnInit {
  saving = false;
  id: number;
  storage = new StorageOutPutDto();
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  isCollapsed = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private router: ActivatedRoute,
    private _storageService: StorageServiceProxy
  ) 
  { 
    super(injector);
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id']
    });
    this._storageService.get(this.id.toString())
    .subscribe((result: StorageOutPutDto) => {
      this.storage.storageCode = result.storageCode;
      this.storage.storageName = result.storageName;
      this.storage.address = result.address;
      this.storage.description = result.description;
      this.storage.products = result.products;
    });
  }

  Cancel(): void {
    this._router.navigate(['app/storage']);
  }
}
