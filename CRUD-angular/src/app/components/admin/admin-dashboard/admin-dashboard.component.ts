import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UserserviceService } from '../../users/userservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  
  cols = [
    {"Head" : "UserID", 'Field' : '_id' },
    {"Head" : "Name", 'Field' : 'name' },
    {"Head" : "Email", 'Field' : 'email' },
    {"Head" : "Mobile No", 'Field' : 'mobile' },
    {"Head" : "Password", 'Field' : 'password' },
    {"Head" : "UserType", 'Field' : 'usertype' }
  ];
  data:any;

  
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private userservice:UserserviceService) {
    var params = {'page':0,'size':10}
    this.userservice.getUsers(params).subscribe((res:any)=>{
      this.data = res['data']
      console.log("data:",this.data)
    })
  }


  ngOnInit(){
    
  }
}
