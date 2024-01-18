import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductStorageService } from '../../services/product-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyNameService } from '../../services/company-name.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.css'
})
export class EditProductFormComponent implements OnInit {
  id;
  data;
  companyNames$;
  storage$;
  product;
  productValue;


  constructor( private router: Router,
    private route: ActivatedRoute,
    companyNameService: CompanyNameService,
    productStorageService: ProductStorageService,
    private productService: ProductService){
    this.companyNames$=companyNameService.getCompanyNames();
    this.storage$=productStorageService.getStorage();

    this.id=this.route.snapshot.paramMap.get('id');


  }
  ngOnInit(): void {
  // Assuming you retrieve productValue asynchronously
  this.productService.get(this.id).then((product) => {
    this.productValue = product;
  });
}


  newProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    companyName: new FormControl('', [Validators.required]),
    storage: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    highlights: new FormControl('', [Validators.required]),
    promotions: new FormControl('',[Validators.required])
  });


  get name(){
    return this.newProductForm.get('name');
  }

  get price(){
    return this.newProductForm.get('price');
  }

  get companyName(){
    return this.newProductForm.get('companyName');
  }

  get storage(){
    return this.newProductForm.get('storage');
  }

  get color(){
    return this.newProductForm.get('color');
  }

  get imageUrl(){
    return this.newProductForm.get('imageUrl');
  }

  get highlights(){
    return this.newProductForm.get('highlights');
  }

  get promotions(){
    return this.newProductForm.get('promotions');
  }


  save (product) {
    this.productService.update(this.id,product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product?')){
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
