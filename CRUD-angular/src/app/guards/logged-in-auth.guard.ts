import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../components/auth/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {
  
  constructor(private authservice:AuthserviceService, private router:Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.authservice.isLoggedIn()){
      if(this.authservice.isAdmin()){
        this.router.navigate(['admin/home'])
      }else{
        this.router.navigate([''])
      }
      return false;
    }
    else{
      return true;
    }
}
  
}
