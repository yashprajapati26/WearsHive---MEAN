import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../auth/not-found/not-found.component';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { CategoryListComponent } from '../products/manage-category/category-list/category-list.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { AdduserComponent } from '../users/adduser/adduser.component';
import { EdituserComponent } from '../users/edituser/edituser.component';
import { UserlistComponent } from '../users/userlist/userlist.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
    {
        path: 'home',
        component: AdminDashboardComponent,
    },
    {
        path: 'users',
        component: UserlistComponent,
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'add-user',
        component: AdduserComponent,
    },
    {
        path: 'edit-user/:id',  
        component: EdituserComponent,
    },
    {
        path: 'category',
        component: CategoryListComponent
    },
    {
        path: 'product-list',
        component: ProductListComponent
    },
    {
        path: 'add-product',
        component: AddProductComponent
    },
    {
        path: 'edit-product/:id',       
        component: AddProductComponent
    },
    {
        path:'**',
        component: NotFoundComponent
    }
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class AdminRoutingModule { }
