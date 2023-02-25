import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { Subject } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  public cartSubject = new Subject<string>();


  constructor(private http: HttpClient) { }

  getProductList(params?: any) {
    let url: any
    if (params) {
      url = environment.api_url + "/shop/" + params['page'] + "/" + params['size'];
    } 
    else {
      url = "http://localhost:3000/shop/"
    }
    return this.http.get(url)
  }

  addProduct(data: any) {
    const url = "http://localhost:3000/createproduct"
    return this.http.post(url, data)
  }

  getProduct(id: any) {
    const url = "http://localhost:3000/getproduct/" + id;
    return this.http.get(url)
  }

  editProduct(id: any, data: any) {
    const url = "http://localhost:3000/editproduct/" + id;
    return this.http.post(url, data)
  }

  deleteProduct(id: any) {
    const url = "http://localhost:3000/deleteproduct/" + id;
    return this.http.get(url)
  }


  // cart api
  addToCart(data: any) {
    const url = "http://localhost:3000/cart/addtocart";
    return this.http.post(url, data)
  }
  removeFromCart(data: any) {
    const url = "http://localhost:3000/cart/removefromcart";
    return this.http.post(url, data)
  }

  showCart(userId: any) {
    const url = "http://localhost:3000/cart/getcartitems/" + userId;
    return this.http.get(url)
  }


  //category service api
  getCategorys(){
    const url = "http://localhost:3000/getcategorys";
    return this.http.get(url)
  }

  getSubCategorys(){
    const url = "http://localhost:3000/getsubcategorys";
    return this.http.get(url)
  }

  sendNotification(data: any) {
    this.cartSubject.next(data)
  }
}
