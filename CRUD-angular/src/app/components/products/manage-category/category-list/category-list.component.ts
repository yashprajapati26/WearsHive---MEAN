import { Component } from '@angular/core';
import { ProductserviceService } from '../../productservice.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  categorys:any;
  subcategory:any

  constructor(private productservice:ProductserviceService){}

  ngOnInit(){
    this.getCategorys()
    this.getSubCategorys()
  }

  getCategorys(){
    this.productservice.getCategorys().subscribe((res:any)=>{
      this.categorys = res['categorys']
    })
  }

  getSubCategorys(){
    this.productservice.getSubCategorys().subscribe((res:any)=>{
      this.subcategory = res['subcategory']
    })
  }
}
