import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent {
@Input('tableCols') tableCols : any;
@Input('tableData') tableData : any;
constructor(){}

ngOnInit(){

}
}
