import {
  Component,
  EventEmitter, Output
} from '@angular/core';
import {
  JwtHelperService
} from '@auth0/angular-jwt';
import {
  ToastrService
} from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthserviceService } from '../../auth/authservice.service';
import {
  ProductserviceService
} from '../productservice.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent {

  items: any;
  page: number = 0;
  pageSize: number = 4;
  params: any = {
    'page': this.page,
    'size': this.pageSize
  };
  jwtHelper = new JwtHelperService();
  totleProducts: number = 0;
  isLogin: boolean = false;
  imageUrl = environment.api_url

  cartProducts: any;
  cartList = [];

  @Output() childEvent = new EventEmitter

  constructor(private productservice: ProductserviceService, private toastrservice: ToastrService, private authservice: AuthserviceService) {
    let userId = this.getUserId()
    if (userId) {
      this.productservice.showCart(userId).subscribe((res: any) => {
        this.totleProducts = res['totalItem']
        this.cartProducts = res['cartItem']
        this.childEvent.emit(this.totleProducts)
      })
    }
  }


  ngOnInit() {
    this.fatchProducts()
    this.isLogin = this.authservice.isLoggedIn()
  }


  fatchProducts() {
    this.productservice.getProductList(this.params).subscribe((res: any) => {
      this.items = res['products']
    })
  }

  getRequestParams(): any {
    this.params[`page`] = this.page;
    this.pageSize = this.pageSize * 2;
    this.params['size'] = this.pageSize
    this.fatchProducts()
  }

  addToCart(productId: any): void {
    let userId = this.getUserId()
    let data = {
      "productId": productId,
      "userId": userId
    }
    this.productservice.addToCart(data).subscribe((res: any) => {
      // called toaster
      this.SuccessToastr(res['msg'])
      this.totleProducts = res['totalData']
      this.childEvent.emit(this.totleProducts)
      // window.location.reload();
    this.productservice.sendNotification(this.totleProducts);

    })
  }
 

  removeFromCart(productId: any): void {
    let userId = this.getUserId()
    let data = {
      "productId": productId,
      "userId": userId
    }
    this.productservice.removeFromCart(data).subscribe((res: any) => {
      // called toaster
      this.SuccessToastr(res['msg'])
      this.totleProducts = res['totalData']
      this.childEvent.emit(this.totleProducts)
      // window.location.reload();
      this.productservice.sendNotification(this.totleProducts);

    })
  }

  SuccessToastr(msg: any) {
    this.toastrservice.success(msg)
  }

  getUserId() {
    let token = localStorage.getItem('token') || ''
    if (token != '') {
      const decodeToken = this.jwtHelper.decodeToken(token)
      let userId = decodeToken['user_id']
      return userId;
    }
    return 0;
  }


  CheckProduct(productId: string) {
    let id = productId
    var isPresent = this.cartProducts.find(function (el: any) { return el.productId._id === id }) !== undefined;
    return isPresent
  }

}
