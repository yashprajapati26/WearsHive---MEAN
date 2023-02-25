import { Component } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

export interface TableColumn {
  name: string; // column name
  dataKey: string; // name of key of the actual data in this column
  position?: 'right' | 'left'; // should it be right-aligned or left-aligned?
  isSortable?: boolean; // can a column be sorted?
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  constructor(private title:Title) { }

  ngOnInit() {
    console.log('admin-home component')
    this.title.setTitle("Admin - Dashboard")
  }

}
