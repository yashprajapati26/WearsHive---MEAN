import {
  Component,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AuthserviceService
} from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() isLogin: boolean = false;
  msg: string | undefined;


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })



  constructor(private authservice: AuthserviceService, private router: Router) {}

  ngOnInit(): void {}

  login(formdata: any) {
    console.log(formdata)
   
    this.authservice.doLogin(formdata).subscribe( (res:any) => {
        if (res) {
          console.log(res)
          if (res['isLogin']) {
            this.isLogin = res['isLogin'];

            //set tokrn in localstorage
            localStorage.setItem('token', res['token']);
            localStorage.setItem('admin', res['isAdmin']);

            if (res['isAdmin']) {
              this.router.navigate(['admin/home']).then(() => {
                window.location.reload();
              });
            } else {
              this.router.navigate(['']).then(() => {
                window.location.reload();
              });
            }
          }
        }
      },
      (error: any): void => {
        this.msg = error.error['msg']
      })
  }

  // for form validation message  
  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

}
