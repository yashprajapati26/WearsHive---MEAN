import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit{
  
  // @Input('data') data: string | undefined;
  @Input("searchKey") searchKey : string | undefined;
  visible = true;



  userForm = new FormGroup({
    name : new FormControl('',[Validators.required,]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")])
  })

  msg:any;
  isSubmitted:boolean = false;

  constructor(private userservice:UserserviceService){}

  ngOnInit(){
    console.log("onInit method called")
  }

  toggle() {
    this.visible = !this.visible;
  }

  adduser(data:any){
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this.userservice.addUser(data).subscribe((res:any)=>{
        this.msg = res['msg']
          // this.router.navigate(["user-list"])
          // window.location.reload();
          this.userForm.reset();
      })
    }else{
      this.msg = "please enter correct details"
      document.getElementById("alert")
    }
  }

  get f() { return this.userForm.controls; }

}
