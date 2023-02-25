import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService{

  constructor(private http:HttpClient) { }

  doSignup(formdata:any){
    const url = "http://localhost:3000/signup";
    return this.http.post(url,formdata)
  }
 
  doLogin(formdata:any){
    const url = "http://localhost:3000/login";
    return this.http.post(url,formdata);
  }

  doLogout(){
    const url = "http://localhost:3000/logout";
    return this.http.get(url);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

  isAdmin(){
    if(localStorage.getItem('admin')=="true"){
      return true;
    }else{
      return false;
    }
  }

}
