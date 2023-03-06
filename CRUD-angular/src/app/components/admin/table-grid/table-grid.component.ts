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

@Input('actionArray') actionArray = [
  {
    icon: 'edit',
    function: 'editEntity',
    class: 'btn btn-outline-primary'
  },
  {
    icon: 'delete',
    function: 'deleteEntity',
    class: 'btn btn-outline-danger'
  }
]

// ParamData = {'page': 1 , 'size':5 }
@Output('ParamsDataEvent') ParamsDataEvent = new EventEmitter<any>();

@Output('deleteActionEvent') deleteActionEvent = new EventEmitter<any>();

@Output('editActionEvent') editActionEvent = new EventEmitter<any>();

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

deleteEntity(row: any) {
  this.deleteActionEvent.emit(row);
}

editEntity(row: any) {
  this.editActionEvent.emit(row);
}

detectActionEvent(actionType:string,data:any){
  console.log(data['_id'])
  console.log(actionType)
  if(actionType=="editEntity"){
    this.editEntity(data);
  }
  else if(actionType=="deleteEntity"){
    this.deleteEntity(data);
  }
  else{
    console.log("not defined")
  }
}


}
