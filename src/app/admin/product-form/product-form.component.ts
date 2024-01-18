import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { CompanyNameService } from '../../services/company-name.service';
import { ProductStorageService } from '../../services/product-storage.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  newProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('',[Validators.required,Validators.min(0)]),
    companyName: new FormControl('',[Validators.required]),
    storage: new FormControl('',[Validators.required]),
    color: new FormControl('',[Validators.required]),
    imageUrl: new FormControl('',[Validators.required,Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    highlights: new FormControl('',[Validators.required]),
    promotions: new FormControl('',[Validators.required])
  });



  data: any;
  companyNames$;
  storage$;




  constructor( private router: Router,
    companyNameService: CompanyNameService,
    productStorageService: ProductStorageService,
    private productService: ProductService){
    this.companyNames$=companyNameService.getCompanyNames();
    this.storage$=productStorageService.getStorage();
  }

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
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  onFileChange(event: any){
     const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(this.data); // Data will be logged in array format containing objects
    };

  }

  upload(){
    for (let object of this.data){
      this.productService.create(object);
    }
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {

  }
}
