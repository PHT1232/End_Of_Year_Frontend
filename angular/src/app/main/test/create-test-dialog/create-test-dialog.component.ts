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

  @Output() onSave = new EventEmitter<any>();

  constructor(    
    injector: Injector,
    private _testService: TestServiceProxy,
    public bsModalRef: BsModalRef) { 
      super(injector)
    }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    const test = new TestInput();
    test.init(this.test);

    this._testService.createTestManagement(test).subscribe(
      () => {
        this.notify.info(this.l('Saved Successfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    )
  }
}
