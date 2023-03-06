import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UserserviceService } from '../../users/userservice.service';
import { Router } from '@angular/router';

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
    // {"Head" : "Password", 'Field' : 'password' },
    {"Head" : "UserType", 'Field' : 'usertype' }
  ];
  
  
  data:any;
 

  ParamData = {'page':1,"size":5,"totalRecords":0,'sortBy':'_id', 'sort_direction':1 }
  actionArray = [
    {
      icon: 'Edit',
      function: 'editEntity',
      class: 'btn btn-outline-primary'
    },
    {
      icon: 'Delete',
      function: 'deleteEntity',
      class: 'btn btn-outline-danger'
    },
  ];
 
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

  constructor(private breakpointObserver: BreakpointObserver, private userservice:UserserviceService, private router:Router) {
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

  editAction(data:any){
    console.log("edit called",data)
    const id = data['_id']
    this.router.navigate([`admin/edit-user/${id}`]);
    // this.userservice.editUser(data['_id'])
  }

  deleteAction(data:any){
    console.log("delete called",data)
    const id = data['_id']
    this.userservice.deleteUser(id).subscribe((res: any) => {
      alert("User " + id + " deleted sucessfully")
      // this.router.navigate(["user-list"])
      window.location.reload();
    })


  }

}
