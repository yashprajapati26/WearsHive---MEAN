import {
  Injectable
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot
} from '@angular/router';
import {
  AuthserviceService
} from '../components/auth/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(private authservice: AuthserviceService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.authservice.isAdmin()){
        return true
      } 
      else {
        alert("You are not accessible")
        return false;
      }
  }
}
