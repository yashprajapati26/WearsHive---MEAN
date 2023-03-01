import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent {

@Input('tableCols') tableCols : any;
@Input('tableData') tableData : any;

page:number = 1;
pageSize:number = 5;
totalRecords:number = 30;

constructor(){
  // this.totalRecords = this.tableData
}

ngOnInit(){}


handlePageChange(event: number): void {
  this.page = event;
}

}
