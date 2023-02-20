import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  RoleServiceProxy,
  RoleDto,
  PermissionDto,
  CreateRoleDto,
  PermissionDtoListResultDto
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-test-dialog',
  templateUrl: './create-test-dialog.component.html',
  styleUrls: ['./create-test-dialog.component.css']
})
export class CreateTestDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  role = new RoleDto();
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  constructor(    
    injector: Injector,
    private _roleService: RoleServiceProxy,
    public bsModalRef: BsModalRef) { 
      super(injector)
    }

  ngOnInit(): void {
  }

}
