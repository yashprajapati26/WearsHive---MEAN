import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthserviceService } from '../../auth/authservice.service';
import { Router } from '@angular/router';
import { faIdCard, faShoppingBag, faSign, faSignInAlt, faSignOutAlt, faTshirt, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authservice:AuthserviceService, private router:Router) {}
  
  faShoppingBag = faShoppingBag
  faUser = faUser
  faTshirt = faTshirt
  faSignOutAlt = faSignOutAlt
  faCat = faIdCard

  title:string = "Wears Hive - Admin Dashboard"

  ngOnInit(){}

  doLogout(){
    this.authservice.doLogout().subscribe((res)=>{
      this.router.navigate(['login']).then(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        localStorage.clear();
        window.location.reload();
      });
    })
  }

  }

  
