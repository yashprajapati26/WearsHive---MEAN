import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }


  getUsers(params:any){
     console.log(params)
     let url = "http://localhost:3000/getusers/"+params['page']+"/"+params['size']
     return this.http.get(url);
  }

  getUserInfo(Id:any){
    let url = "http://localhost:3000/getsingleuser/"+Id
    return this.http.get(url);
  }

  addUser(data:any){
    let url = "http://localhost:3000/createuser/"
    return this.http.post(url,data);
  }

  deleteUser(Id:any){
    let url = "http://localhost:3000/deleteuser/"+Id
    return this.http.get(url);
  }

  searchUser(key:any){
    let url = "http://localhost:3000/searchuser/"+key;
    return this.http.get(url);
  }

  editUser(key:any,data:any){
    let url = "http://localhost:3000/edituser/"+key;
    return this.http.post(url,data);
  }

}
