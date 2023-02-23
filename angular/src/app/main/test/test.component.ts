import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  GetAllTestDto,
  GetAllTestDtoPagedResultDto,
  TestDto,
  TestServiceProxy
} from '@shared/service-proxies/service-proxies';
import { CreateTestDialogComponent } from '@app/main/test/create-test-dialog/create-test-dialog.component';
import { EditTestDialogComponent } from '@app/main/test/edit-test-dialog/edit-test-dialog.component';
import { AppComponentBase } from '@shared/app-component-base';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

class PagedTestRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [appModuleAnimation()]
})
export class TestComponent extends PagedListingComponentBase<TestDto> {

  keyword = '';
  tests: GetAllTestDto[] = [];
  totalCount: number;


  constructor(
    injector: Injector,
    private _testService: TestServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
   }

  list(
    request: PagedTestRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    
    this._testService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: GetAllTestDtoPagedResultDto) => {
        this.tests = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(test: TestDto): void {
    this.swal.fire({
      title: 'Are you sure?',
      text: 'Test will be deleted',
      showCancelButton: true,
      confirmButtonColor: this.confirmButtonColor,
      cancelButtonColor: this.cancelButtonColor,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      reverseButtons: this.ReverseButtons,
      icon: 'warning',
    })
    .then((result) => {
      if (result.value) {
        this._testService.delete(test.testVarible).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: () => {
              abp.notify.success(this.l('Delete Successfully!'));
              this.refresh();
            },
            error: (error) => {
              console.log(error);
              if (error.error && error.error.message) {
                this.notify.error(error.error.message);
              }
            }, 
            complete() {

            },
          })
      }
    });
    // abp.message.confirm(
    //   this.l('Do you want to delete this ' + test.testVarible),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       this._testService
    //         .delete(test.testVarible)
    //         .pipe(
    //           finalize(() => {
    //             abp.notify.success(this.l('SuccessfullyDeleted'));
    //             this.refresh();
    //           })
    //         )
    //         .subscribe(() => {});
    //     }
    //   }
    // )
  }

  createTest(): void {
    this.showCreateOrEditTestDialog();
  }

  editTest(test: GetAllTestDto): void {
    this.showCreateOrEditTestDialog(test.testVarible);
  }

  showCreateOrEditTestDialog(id?: number): void {
    let createOrEditTestDialog: BsModalRef;
    if (!id) {
      createOrEditTestDialog = this._modalService.show(
        CreateTestDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditTestDialog = this._modalService.show(
        EditTestDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }
    
    createOrEditTestDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
