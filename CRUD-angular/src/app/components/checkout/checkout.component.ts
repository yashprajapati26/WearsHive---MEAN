import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { interval } from 'rxjs';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductserviceService } from '../products/productservice.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutForm = new FormGroup({
    firstname : new FormControl("yash",Validators.required),
    lastname : new FormControl("prajapati",Validators.required),
    company : new FormControl("radixweb",Validators.required),
    address1 : new FormControl("31 harishchandra",Validators.required),
    address2 : new FormControl("near sumin park , vastral road",Validators.required),
    state : new FormControl("gujrat",Validators.required),
    zipcode : new FormControl("382418",Validators.required),
    country : new FormControl("9",Validators.required),
    email : new FormControl("yash260801@gmail.com",Validators.required),
    phone : new FormControl("9324756212",Validators.required)

  })


  jwtHelper = new JwtHelperService();
  TotalAmount:any = 0;
  extraCharges:any = 50;
  NetTotle:any = 0;
  cartItems:any;
  userId:any;


  constructor(private productservice:ProductserviceService, private checkoutservice:CheckoutService){}



  ngOnInit(){

    

    let token = localStorage.getItem('token') || ''
    const decodeToken = this.jwtHelper.decodeToken(token)
    this.userId = decodeToken['user_id'] 
    this.productservice.showCart(this.userId).subscribe((res:any)=>{
      console.log("cart item : ",res)
      this.cartItems = res['cartItem']
      this.TotalAmount = res['TotalAmount']
      this.NetTotle = this.TotalAmount + this.extraCharges
    })
  }

  onSubmit(data:any){
    console.log(data)
    let formData = new FormData();
    formData.append('userId',this.userId);
    formData.append('data', data);
    formData.append('NetTotle',this.NetTotle);
    formData.append('TotalAmount',this.TotalAmount);
    formData.append('extraCharges',this.extraCharges);
    formData.append('cartItems',this.cartItems);

    console.log(formData)
    this.checkoutservice.doCheckout(formData).subscribe((res:any)=>{
      console.log(res)
    })

  }

}
