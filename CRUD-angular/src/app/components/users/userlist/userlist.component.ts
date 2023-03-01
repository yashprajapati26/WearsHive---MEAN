import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthserviceService
} from '../../auth/authservice.service';
import { UserserviceService } from '../userservice.service';

interface user {
  id: Number;
  name: String;
  mobile: String;
  email: String;
  password: String;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {

  constructor(private userservice: UserserviceService, private router: Router, private authservice: AuthserviceService) { }

  users: user[] = [];
  sortBy: string = "id";
  asce: number = 1;
  totalData: any;

  isadmin: boolean = false;

  page: number = 1;
  // count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];


  searchForm = new FormGroup({
    search: new FormControl("", [Validators.required])
  });

  

  ngOnInit() {
    this.isAdmin()
    this.fatchUsers();
    console.log("/..... changes")
    // this.searchForm.get("search").valueChanges.subscribe(selectedValue => {
    //   console.log('address changed')
    //   console.log(selectedValue)
    // })

    this.searchForm.get("search")?.valueChanges.subscribe((val: any) => {
      console.log("address changes")
      console.log(val)
      if (val != "") {
        this.userservice.searchUser(val).subscribe((res: any) => {
          this.users = res['users']
        })
      } else {
        this.fatchUsers();
      }
    })

  }

  onSubmit() {
    console.log(this.searchForm.value);
  }


  fatchUsers() {
    // this.users = db['users']
    let params = this.getRequestParams(this.page, this.pageSize)
    this.userservice.getUsers(params).subscribe((res: any) => {
      if (res) {
        console.log(res)
        this.users = res['data']
        this.totalData = res['totalData']
      }
      else {
        console.log("error")
      }
    })

  }

  deleteUser(id: any) {
    this.userservice.deleteUser(id).subscribe((res: any) => {
      alert("User " + id + " deleted sucessfully")
      // this.router.navigate(["user-list"])
      window.location.reload();
    })
  }



  sortTable(sortby: string) {
    console.log(sortby)
    this.sortBy = sortby
    this.asce = this.asce - (this.asce * 2)  // 1 to -1 & -1 to 1
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.fatchUsers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.fatchUsers();
  }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  isAdmin() {
    if (this.authservice.isAdmin()) {
      this.isadmin = true
    }
    else{
      this.isadmin = false
    }
  }


}
