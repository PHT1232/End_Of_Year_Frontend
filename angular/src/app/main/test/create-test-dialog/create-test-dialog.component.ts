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
  selector: 'app-create-test-dialog',
  templateUrl: './create-test-dialog.component.html',
  styleUrls: ['./create-test-dialog.component.css']
})
export class CreateTestDialogComponent extends AppComponentBase implements OnInit {
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

  save(): void {
    this.saving = true;

    const formData = new FormData();
    for (const file of this.files) {
      formData.append('file', file);
    }
    const test = new TestInput();
    test.init(this.test);
    this
    this._testService.createTestManagement(test).subscribe(
      () => {
        this.notify.success(this.l('Saved Successfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    )
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
