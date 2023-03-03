import { Component, Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthserviceService } from '../../auth/authservice.service';
import { ProductserviceService } from '../productservice.service';



@Pipe({name: 'orderBy'})
export class orderByPipe implements PipeTransform {
  
  transform(input: Array<any>, sortby:string, asce:number) {
    if(sortby=="id" || sortby=="price") // because of id is number 
    {
        return input.sort((a,b)=>{ a= a[sortby]; b= b[sortby]; return (a - b) * asce; });
    }
    return input.sort((a,b)=>{ a= a[sortby].toLowerCase(); b= b[sortby].toLowerCase(); return a.localeCompare(b) * asce; });
  }
}


interface user {  
  id: Number;  
  name: String;  
  mobile: String;  
  email: String;  
  password: String;  
}  

interface product {
  id: Number;
  prodcut_name: String;
  price: Number;
  description: String;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {
  
  // users: user[] = [];
  // products : product[] = [];
  items = []
  sortBy :string =  '_id';
  asce:number = 1;
  searchText : string = ""
  isadmin:boolean = false
  imageUrl = environment.api_url
  page:number = 1;
  count:number = 0;
  pageSize:number = 3;
  pageSizes = [3, 5, 10, 15];

  
  constructor(private productservice:ProductserviceService, private authservice:AuthserviceService){}

  ngOnInit(){
    this.isAdmin()
    this.fatchProducts();
  }


  fatchProducts(){
    let params = this.getRequestParams(this.page, this.pageSize);
    this.productservice.getProductList(params).subscribe((res:any)=>{
      this.items = res['products']
      this.count = res['totalData']
      console.log(this.items)
    })
  
  }

  sortTable(sortby:string){
    console.log(sortby)
    this.sortBy = sortby    
    this.asce = this.asce- (this.asce * 2)  // 1 to -1 & -1 to 1
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.fatchProducts();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.fatchProducts();
  }
  
  
  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`page`] = page-1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  deleteProduct(id:any){
    this.productservice.deleteProduct(id).subscribe((res:any)=>{
      this.ngOnInit();
      alert(res['msg']);

    },(err:any)=>{
      alert("something wrong");
    })
  }

  isAdmin(){
    if (this.authservice.isAdmin()) {
      this.isadmin = true
    }
    else{
      this.isadmin = false
    }
  }

}
