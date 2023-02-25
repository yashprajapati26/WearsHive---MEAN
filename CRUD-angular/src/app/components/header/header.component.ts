import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthserviceService } from '../auth/authservice.service';
  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  faCoffee = faCoffee;
  faCart = faShoppingCart;
  isLogin:boolean = false;
  searchKey:String | undefined;
  totalItem:number = 0

  constructor(private authservice:AuthserviceService, private router:Router){}

  ngOnInit(){
    this.isLogin = this.authservice.isLoggedIn()
  }

  logout(){
    this.authservice.doLogout().subscribe((res)=>{
      this.router.navigate(['']).then(() => {
        localStorage.removeItem("token")
        window.location.reload();
      });

    })
  }
 
}
