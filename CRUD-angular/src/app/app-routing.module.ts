import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './components/auth/not-found/not-found.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductSliderComponent } from './components/products/product-slider/product-slider.component';
import { SingleProductComponent } from './components/products/single-product/single-product.component';
import { RxJSComponent } from './components/rx-js/rx-js.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { EdituserComponent } from './components/users/edituser/edituser.component';
import { UserlistComponent } from './components/users/userlist/userlist.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    canActivate:[LoggedInAuthGuard],
    component: LoginComponent
  },
  {
    path: 'signup',
    canActivate:[LoggedInAuthGuard],
    component: SignupComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'shop',
    component: ProductSliderComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'user-list',
    // canActivate: [AuthGuard],
    component: UserlistComponent,
  },
  {
    path: 'add-user',
    canActivate: [AuthGuard],
    component: AdduserComponent,
  },
  {
    path: 'edit-user/:id',
    canActivate: [AuthGuard],
    component: EdituserComponent,
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'single-product/:id',
    component: SingleProductComponent
  },
  {
    path: 'add-product',
    canActivate: [AuthGuard],
    component: AddProductComponent
  },
  {
    path: 'edit-product/:id',
    canActivate: [AuthGuard],
    component: AddProductComponent
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    component: CartComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard], component: AdminHomeComponent,
    canActivateChild: [AdminGuard],
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'rxjs',
    component: RxJSComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
