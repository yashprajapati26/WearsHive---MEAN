import { Component, Input } from '@angular/core';
import { UserserviceService } from '../../users/userservice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input('users') users: any | undefined;
  @Input('tableColumns') tableColumns: any

  constructor(private userservice: UserserviceService) { }

  ngOnInit() {
    console.log("users--", this.users)
  }

  contents = []


}
