import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent {

@Input('tableCols') tableCols : any;
@Input('tableData') tableData : any;

// @Input('page') page:any;
// @Input('pageSize') pageSize:any;
// @Input('totalRecords') totalRecords :any;

@Input('ParamData') ParamData = {
  'page' : 1,
  'size' : 5,
  'totalRecords' : 0,
  'sortBy': '_id',
  'sort_direction': 1,
}


// ParamData = {'page': 1 , 'size':5 }
@Output('ParamsDataEvent') ParamsDataEvent = new EventEmitter<any>();

// sortBy:any = '_id'; 
// asce:any = 1;

fasort = faArrowCircleDown

constructor(){}

ngOnInit(){}


handlePageChange(event: number): void {
  console.log("event : ",event)
  this.ParamData['page'] = event
  this.ParamsDataEvent.emit(this.ParamData)
}

sort(sortBy:any){
  console.log(sortBy)
  this.ParamData['sortBy'] = sortBy
  this.ParamData['sort_direction'] = this.ParamData['sort_direction'] - (this.ParamData['sort_direction'] * 2)  // 1 to -1 & -1 to 1
  this.ParamsDataEvent.emit(this.ParamData)

}

}
