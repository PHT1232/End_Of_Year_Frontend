import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { ProductGetAllDto, ProductServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.css'],
  animations: [appModuleAnimation()]
})
export class ExportImportComponent extends PagedListingComponentBase<ProductGetAllDto> {
  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    // throw new Error('Method not implemented.');
  }
  protected delete(entity: ProductGetAllDto): void {
    // throw new Error('Method not implemented.');
  }
  bsInlineRangeValue: Date[];

  keyword: string;

  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit(): void {
  }

}
