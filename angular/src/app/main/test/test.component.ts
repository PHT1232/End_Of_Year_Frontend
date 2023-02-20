import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  RoleServiceProxy,
  RoleDto,
  RoleDtoPagedResultDto,
  GetAllTestDto
} from '@shared/service-proxies/service-proxies';

class PagedRoleRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [appModuleAnimation()]
})
export class TestComponent extends PagedListingComponentBase<GetAllTestDto> {

  constructor(
    injector: Injector,
    private _rolesService: RoleServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
   }

  ngOnInit(): void {
  }

  list(
  ): void {
  }

  delete(test: GetAllTestDto): void {
    
  }
}
