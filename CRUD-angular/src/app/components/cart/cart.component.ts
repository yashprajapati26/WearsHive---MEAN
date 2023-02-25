import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ProductserviceService } from '../products/productservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  jwtHelper = new JwtHelperService();
  cartItems:any
  imageUrl = environment.api_url

  TotalAmount:number = 0;
  extraCharges:number = 50;
  NetTotle:number = 0;


  constructor(private productservice:ProductserviceService, private toastrservice:ToastrService){}

  ngOnInit(){
    this.showCart()
  }

  showCart(){
    let token = localStorage.getItem('token') || ''
    const decodeToken = this.jwtHelper.decodeToken(token)
    let userId = decodeToken['user_id'] 
    this.productservice.showCart(userId).subscribe((res:any)=>{
      console.log("cart item : ",res)
      this.cartItems = res['cartItem']
      this.TotalAmount = res['TotalAmount']
      this.NetTotle = this.TotalAmount + this.extraCharges
    })
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

  SuccessToastr(msg: any) {
    this.toastrservice.success(msg)
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
      this.cartItems = res['totalData']
      // this.childEvent.emit(this.totleProducts)
      window.location.reload();

    })
  }

}
