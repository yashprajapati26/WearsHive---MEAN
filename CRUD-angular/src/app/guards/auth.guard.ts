import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthserviceService } from '../components/auth/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice:AuthserviceService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{
    if(this.authservice.isLoggedIn()){
        return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
  
} 
