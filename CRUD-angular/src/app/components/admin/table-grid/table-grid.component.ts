import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent {

@Input('tableCols') tableCols : any;
@Input('tableData') tableData : any;

@Input('page') page:any;
@Input('pageSize') pageSize:any;
@Input('totalRecords') totalRecords :any;

ParamData = {'page': 1 , 'size':5}
@Output('ParamsDataEvent') ParamsDataEvent = new EventEmitter<any>();


constructor(){}

ngOnInit(){}


handlePageChange(event: number): void {
  this.page = event;
  console.log("event : ",event)
  this.ParamData['page'] = event
  this.ParamsDataEvent.emit(this.ParamData)
}

}
