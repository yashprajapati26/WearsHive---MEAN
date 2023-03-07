import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import {
  environment
} from 'src/environments/environment';
import {
  ProductserviceService
} from '../productservice.service';
import {
  JwtHelperService
} from '@auth0/angular-jwt';
import {
  ToastrService
} from 'ngx-toastr';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {

  faHeart = faHeart;
  id: any;
  productDetail: any | undefined;
  imageUrl = environment.api_url
  jwtHelper = new JwtHelperService();
  toggleBtn = true
  totleProducts: any;
  cartProducts: any;
  @Output() childEvent = new EventEmitter


  constructor(private route: ActivatedRoute, private productservice: ProductserviceService, private toastrservice: ToastrService) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.productservice.getProduct(this.id).subscribe((res: any) => {
        this.productDetail = res['product']
      });
    }

    let userId = this.getUserId()
    if (userId) {
      this.productservice.showCart(userId).subscribe((res: any) => {
        this.totleProducts = res['totalItem']
        this.cartProducts = res['cartItem']
        this.childEvent.emit(this.totleProducts)
        this.toggleBtn = this.CheckProduct(this.id)

      })
    }
  }


  CheckProduct(productId: string) {
    let id = productId
    var isPresent = this.cartProducts.find(function (el: any) {
      return el.productId._id === id
    }) !== undefined;
    console.log("ispresent:",isPresent)
    return isPresent
  }


  getUserId() { 
    let token = localStorage.getItem('token') || undefined
    if (token) {
      const decodeToken = this.jwtHelper.decodeToken(token)
      let userId = decodeToken['user_id']
      return userId;
    }
    return 0;
  }


  SuccessToastr(msg: any) {
    this.toastrservice.success(msg)
  }


  addToCart(productId: any): void {
    let userId = this.getUserId()
    let data = {
      "productId": productId,
      "userId": userId
    }
    this.productservice.addToCart(data).subscribe((res: any) => {
      // called toaster
      this.toggleBtn = !this.toggleBtn
      this.totleProducts = res['totalData']
      this.childEvent.emit(this.totleProducts)
      // this.toggleBtn = this.CheckProduct(productId)
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
      this.toggleBtn = !this.toggleBtn
      this.SuccessToastr(res['msg'])
      this.totleProducts = res['totalData']
      this.childEvent.emit(this.totleProducts)
      // this.toggleBtn = this.CheckProduct(productId)
    })
  }
}
