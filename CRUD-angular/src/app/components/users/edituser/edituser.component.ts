import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {

  userForm = new FormGroup({
    name : new FormControl('',[Validators.required,]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  routeSub: any;
  userId:any;
  user:any;

  constructor(private route: ActivatedRoute, private userservice: UserserviceService){}
  
  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.userId=params['id']
      this.userservice.getUserInfo(this.userId).subscribe((res:any)=>{
        this.userForm.patchValue(res['user'])
      })
    });
  }


  editUser(data:any){
    this.userservice.editUser(this.userId,data).subscribe((res:any)=>{
      alert(res['msg'])
    })
  }
}
