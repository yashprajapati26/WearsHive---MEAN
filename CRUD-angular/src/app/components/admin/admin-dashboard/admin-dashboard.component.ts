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
 

  ParamData = {'page':1,"size":5,"totalRecords":0,'sortBy':'_id', 'sort_direction':1 }
 
 
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
    this.fatchData()
  }


  ngOnInit(){}

  fatchData(){
    let params = {'page': this.ParamData['page']-1,'size':this.ParamData['size']}
    this.userservice.getUsers(params).subscribe((res:any)=>{
      this.data = res['data']
      this.ParamData['totalRecords'] =  parseInt(res['totalData'])
      console.log("data:",this.data)
    })
  }

  changeParams(ParamData:any){
    console.log("params---",ParamData)
    this.ParamData['size'] = ParamData['size']
    this.ParamData['page'] = ParamData['page']
    this.fatchData()
  }
}
