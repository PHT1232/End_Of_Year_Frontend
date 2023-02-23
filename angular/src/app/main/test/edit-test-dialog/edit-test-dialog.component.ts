import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  RoleServiceProxy,
  TestServiceProxy,
  TestDto,
  PermissionDto,
  TestInput,
  PermissionDtoListResultDto
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { FormGroup } from '@angular/forms';
import { AppConsts } from '@shared/AppConsts';

const URL = AppConsts.remoteServiceBaseUrl + '/api/Upload/DemoUpload';

@Component({
  selector: 'app-edit-test-dialog',
  templateUrl: './edit-test-dialog.component.html',
  styleUrls: ['./edit-test-dialog.component.css']
})
export class EditTestDialogComponent extends AppComponentBase implements OnInit {
  
  saving = false;
  test = new TestDto();
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  files: File[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(    
    injector: Injector,
    private _testService: TestServiceProxy,
    public bsModalRef: BsModalRef
    ) { 
      super(injector)
    }


  ngOnInit(): void {
  }

}
