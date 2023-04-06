import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UserserviceService } from '../../users/userservice.service';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'; 
import {DragDropModule} from '@angular/cdk/drag-drop';

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

  
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  doneCopy = []

  drop2(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
