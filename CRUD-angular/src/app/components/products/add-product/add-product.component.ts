import {
  Component
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  first
} from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ProductserviceService
} from '../productservice.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  msg: any;
  isEdit: boolean = false;
  id: any;
  isSubmitted: boolean = false;
  file: any | undefined;
  formData = new FormData();
  subCategory:any;
  imageUrl = environment.api_url
  

  productForm = new FormGroup({
    title: new FormControl("", Validators.required),
    price: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
    qty : new FormControl("",Validators.required),
    category: new FormControl("", Validators.required),
    image: new FormControl(""),
    detailUrl: new FormControl("", [Validators.required, Validators.minLength(10)])
  })

  constructor(private route: ActivatedRoute, private router: Router, private productservice: ProductserviceService) {
    this.productservice.getSubCategorys().subscribe((res:any)=>{
      this.subCategory  = res['subcategory']
    })
  }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    this.isEdit = this.id;
    if (this.isEdit) {
      this.productservice.getProduct(this.id)
        .pipe(first())
        .subscribe((res: any) => {
          this.imageUrl = this.imageUrl +"/"+res['product'].image.path
          console.log(res)
          this.productForm.patchValue({
            title: res['product'].title,
            price: res['product'].price,
            qty: res['product'].qty,
            category: res['product'].category._id,
            detailUrl: res['product'].detailUrl,
            image : res['product'].image  
          })
        });
    }
  }

  onSubmit(data: any) {
    this.isSubmitted = true
    if (!this.isEdit) {
      if (this.productForm.valid) {

        console.log(data)

        this.formData.append('title', data['title']);
        this.formData.append('price', data['price']);
        this.formData.append('qty', data['qty']);
        this.formData.append('category', data['category']);
        this.formData.append('detailUrl', data['detailUrl']);
        this.formData.append('image', this.file);

        this.productservice.addProduct(this.formData).subscribe((res: any) => {
          this.msg = res['msg']
          this.productForm.reset();

        })
      }
    } else {
      if (this.productForm.valid) {
        this.productservice.editProduct(this.id, data).subscribe((res: any) => {
          this.msg = res['msg']
          // this.router.navigate(["/product-list"])

        })
      }
    }
  }

  imageSelect(event: any): void {
    this.file = event.target.files[0];
    console.log("selected file : ", this.file)
    // const allowedMimeTypes = ["image/jpeg", "image/jpg","image/png"];
  }

  get f() {
    return this.productForm.controls;
  }


}
