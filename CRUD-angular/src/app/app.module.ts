import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, SearchByNamePipe } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { EdituserComponent } from './components/users/edituser/edituser.component';
import { UserlistComponent } from './components/users/userlist/userlist.component';
// add new modules
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/auth/not-found/not-found.component';
import { orderByPipe, ProductListComponent } from './components/products/product-list/product-list.component';
import { SingleProductComponent } from './components/products/single-product/single-product.component';
// search module
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JwtModule } from "@auth0/angular-jwt";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { AboutComponent } from './components/about/about.component';
import { AdminModule } from './components/admin/admin.module';
import { CartComponent } from './components/cart/cart.component';
import { TableComponent } from './components/common/table/table.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductSliderComponent } from './components/products/product-slider/product-slider.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';
import { CategoryListComponent } from './components/products/manage-category/category-list/category-list.component';
import { AddCategoryComponent } from './components/products/manage-category/add-category/add-category.component';
import { CheckoutComponent } from './components/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserlistComponent,
    EdituserComponent,
    AdduserComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    ProductListComponent,
    SingleProductComponent,
    orderByPipe,
    SearchByNamePipe,
    AddProductComponent,
    ProductSliderComponent,
    CartComponent,
    ContactComponent,
    AboutComponent,
    TableComponent,
    CategoryListComponent,
    AddCategoryComponent,
    CheckoutComponent,

  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FontAwesomeModule,
    JwtModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    AdminModule


  ],
  providers: [AuthGuard,AdminGuard,LoggedInAuthGuard,Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
