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
  RoleDto,
  PermissionDto,
  CreateRoleDto,
  PermissionDtoListResultDto
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-role-dialog.component.html'
})
export class CreateRoleDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  role = new RoleDto();
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  public permissions1 = [
    { label: 'User Management', 
      data: 'Pages.Users', 
      children: 
      [{
          label: 'View',
          data: 'Pages.System.Users.View',
      },
      {
          label: 'Add',
          data: 'Pages.System.Users.Add',
      }], 
      expanded: true },
    { label: 'Test Management', 
      data: 'Pages.System.Test', 
      children: 
      [{
          label: 'View',
          data: 'Pages.System.Test.View',
      },
      {
          label: 'Add',
          data: 'Pages.System.Test.Add',
      },
      {
          label: 'Delete',
          data: 'Pages.System.Test.Delete',
      }], 
      expanded: true },
  ];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roleService
      .getAllPermissions()
      .subscribe((result: PermissionDtoListResultDto) => {
        this.permissions = result.items;
        this.setInitialPermissionsStatus();
      });
  }

  setInitialPermissionsStatus(): void {
    _map(this.permissions, (item) => {
      this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
        item.name
      );
    });
  }

  isPermissionChecked(permissionName: string): boolean {
    // just return default permission checked status
    // it's better to use a setting
    return this.defaultPermissionCheckedStatus;
  }

  onPermissionChange(permission: PermissionDto, $event) {
    this.checkedPermissionsMap[permission.name] = $event.target.checked;
  }

  getCheckedPermissions(): string[] {
    const permissions: string[] = [];
    _forEach(this.checkedPermissionsMap, function (value, key) {
      if (value) {
        permissions.push(key);
      }
    });
    return permissions;
  }

  save(): void {
    this.saving = true;

    const role = new CreateRoleDto();
    role.init(this.role);
    role.grantedPermissions = this.getCheckedPermissions();

    this._roleService
      .create(role)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
  }
}
