import {
  Component,
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AuthserviceService
} from './components/auth/authservice.service';
import {
  UserserviceService
} from './components/users/userservice.service';


@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  product = "product_name"

  transform(items: any, term: string): any {
    return items.filter(items, term);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD-angular';
  admin = false;
  users: any;

  tableColumns = ['_id', 'name' , 'mobile' ,'password']
  constructor(private router: Router, private route:ActivatedRoute, private authservice: AuthserviceService, private userservice: UserserviceService) {}

  ngOnInit() {
    this.checkAdminUrl()
    // this.checkAdmin()
    let params: any = {
      'page': 1,
      'size': 5
    };
    this.userservice.getUsers(params).subscribe((res: any) => {
      this.users = res['data']
    })
  }

  checkAdminUrl(){
    console.log(window.location.href)
    var url = window.location.href
    if(url.includes('admin')){
      this.admin = true
    }else{
      this.admin = false
    }
  }


}
