import { Component, OnInit } from '@angular/core';
import { ProductService } from 'services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  first10Products;
  popularProducts;

  constructor(private productService: ProductService){

  }
   async ngOnInit(): Promise<void> {
    try {
      this.first10Products = await this.productService.getFirst10Documents();
      this.popularProducts = await this.productService.getFirst5Documents();
      console.log(this.first10Products);
    } catch (error) {
      console.error('Error getting first 10 documents:', error);
    }
  }

}
