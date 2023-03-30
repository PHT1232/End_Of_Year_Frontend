import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { TestComponent } from './main/test/test.component';
import { CreateTestDialogComponent } from './main/test/create-test-dialog/create-test-dialog.component';
import { EditTestDialogComponent } from './main/test/edit-test-dialog/edit-test-dialog.component';
import { StorageComponent } from './main/storage/storage.component';
import { CreateStorageComponent } from './main/storage/create-storage/create-storage.component';
import { EditStorageComponent } from './main/storage/edit-storage/edit-storage.component';
import { CategoryComponent } from './main/category/category.component';
import { EditCategoryComponent } from './main/category/edit-category/edit-category.component';
import { CreateCategoryComponent } from './main/category/create-category/create-category.component';
import { DetailCategoryComponent } from './main/category/detail-category/detail-category.component';
import { ProductComponent } from './main/product/product.component';
import { CreateProductComponent } from './main/product/create-product/create-product.component';
import { EditProductComponent } from './main/product/edit-product/edit-product.component';
import { DetailProductComponent } from './main/product/detail-product/detail-product.component';
import { DetailStorageComponent } from './main/storage/detail-storage/detail-storage.component';
import { ExportImportComponent } from './main/export-import/export-import.component';
import { CreateExportImportComponent } from './main/export-import/create-export-import/create-export-import.component';
import { EditExportImportComponent } from './main/export-import/edit-export-import/edit-export-import.component';
import { DetailsExportImportComponent } from './main/export-import/details-export-import/details-export-import.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImportComponent } from './main/export-import/create-export-import/import/import.component';
import { ReturnImportComponent } from './main/export-import/create-export-import/return-import/return-import.component';
import { DetailImportComponent } from './main/export-import/details-export-import/detail-import/detail-import.component';
import { DetailReturnImportComponent } from './main/export-import/details-export-import/detail-return-import/detail-return-import.component';
import { EditReturnImportComponent } from './main/export-import/edit-export-import/edit-return-import/edit-return-import.component';
import { EditImportComponent } from './main/export-import/edit-export-import/edit-import/edit-import.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ExportImportTableFinishedComponent } from './main/export-import/export-import-table-finished/export-import-table-finished.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    TestComponent,
    CreateTestDialogComponent,
    EditTestDialogComponent,
    StorageComponent,
    CreateStorageComponent,
    EditStorageComponent,
    CategoryComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    DetailCategoryComponent,
    ProductComponent,
    CreateProductComponent,
    EditProductComponent,
    DetailProductComponent,
    DetailStorageComponent,
    ExportImportComponent,
    CreateExportImportComponent,
    EditExportImportComponent,
    DetailsExportImportComponent,
    ImportComponent,
    ReturnImportComponent,
    DetailImportComponent,
    DetailReturnImportComponent,
    EditReturnImportComponent,
    EditImportComponent,
    ExportImportTableFinishedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    // BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
  ],
})
export class AppModule {}
