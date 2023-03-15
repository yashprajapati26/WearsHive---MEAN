import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  doCheckout(formData:any){
    let url = "http://localhost:3000/checkout";
    return this.http.post(url,formData);
  }

}
