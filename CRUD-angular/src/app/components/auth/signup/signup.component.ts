import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm = new FormGroup({
    name : new FormControl("",Validators.required),
    email : new FormControl("",Validators.required),
    mobile : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required),
    cpassword : new FormControl("",Validators.required)

  })

  msg:any | undefined

  constructor(private authservice:AuthserviceService){}

  ngOnInit(){

  }

  signup(data:any){
    this.authservice.doSignup(data).subscribe((res:any)=>{
      console.log(res)
      this.msg = res['msg']
    })
  }

}
