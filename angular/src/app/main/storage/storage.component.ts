import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { GetAllStorageDto, GetAllStoragePagedResultDto, StorageServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { result } from 'lodash-es';

class PagedStorageRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  animations: [appModuleAnimation()]
})
export class StorageComponent extends PagedListingComponentBase<GetAllStorageDto> {
  keyword = '';
  storages: GetAllStorageDto[] = [];
  totalCount: number;

  constructor(
    injector: Injector,
    private _storageService: StorageServiceProxy,
  ) { 
    super(injector);
  }

  list(request: PagedStorageRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;

    this._storageService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: GetAllStoragePagedResultDto) => {
        this.storages = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  delete(entity: GetAllStorageDto): void {
    throw new Error('Method not implemented.');
  }
}
