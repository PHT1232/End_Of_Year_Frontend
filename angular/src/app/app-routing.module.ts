import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { TestComponent } from './main/test/test.component';
import { StorageComponent } from './main/storage/storage.component';
import { CreateStorageComponent } from './main/storage/create-storage/create-storage.component';
import { EditStorageComponent } from './main/storage/edit-storage/edit-storage.component';
import { CategoryComponent } from './main/category/category.component';
import { CreateCategoryComponent } from './main/category/create-category/create-category.component';
import { EditCategoryComponent } from './main/category/edit-category/edit-category.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: StorageComponent, canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'test', component: TestComponent, data: { permission: 'Pages.System.Test' } ,canActivate: [AppRouteGuard] },
                    { path: 'storage', component: StorageComponent, data: { permission: 'Pages.System.Storage.View'} , canActivate: [AppRouteGuard] },
                    { path: 'storage/create', component: CreateStorageComponent, data: { permission: 'Pages.System.Storage.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'storage/edit/:id', component: EditStorageComponent, data: { permission: 'Pages.System.Storage.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'category', component: CategoryComponent, data: { permission: 'Pages.System.Category.View'} , canActivate: [AppRouteGuard] },
                    { path: 'category/create', component: CreateCategoryComponent, data: { permission: 'Pages.System.Category.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'category/edit/:id', component: EditCategoryComponent, data: { permission: 'Pages.System.Category.Update'} , canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
