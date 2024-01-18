import { Product } from 'models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'services/product.service';
import * as _ from 'lodash';
import { ProductSpecService } from 'services/product-spec.service';
import { error } from 'jquery';
import { SearchService } from 'services/search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'] // 'styleUrls' instead of 'styleUrl'
})
export class ProductsComponent implements OnInit {
  allProducts: Product[];
  companyName: string;
  storage: string;
  priceHigherThan: number;
  priceLowerThan: number;
  products: Product[];
  filteredProduct: Product[];
  filters: {};
  pagedProduct: Product[];
  searchedProducts: Product[];
  productsTemp: Product[];
  currentPage = 1;
  pageSize = 10;
  constructor(private productService: ProductService, private searchService: SearchService) {
    this.filters = {}; // Initialize filters as an empty object
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.filteredProduct=this.searchedProducts=this.products=this.allProducts = products;
      this.applyFilters();
      this.calculatePagedProduct();
    });
  }

  private applyFilters() {
  this.filteredProduct = _.filter(this.searchedProducts, _.conforms(this.filters));
  this.calculatePagedProduct();

  console.log('Filtered Results:', this.filteredProduct);
}

  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule;
    this.applyFilters();
  }

  filterGreaterThan(property: string, rule: number) {

    this.filters[property] = val => val > rule;
    this.applyFilters();
  }

  filterSmallerThan(property: string, rule: number) {
    this.filters[property] = val => val < rule;
    this.applyFilters();
  }

  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }

  calculatePagedProduct(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.pagedProduct = this.filteredProduct.slice(startIndex, endIndex);
    this.applyFilters();

  }

   search(query: string) {
    if (query) {
      this.searchService.search(query).subscribe((products) => {
        this.productsTemp = products.results.map((result) => ({
          key: result.id,
          name: result.name,
          color: result.color,
          companyName: result.companyName,
          imageUrl: result.imageUrl,
          price: result.price,
          storage: result.storage,
          highlights: result.highlights,
          promotions: result.promotions
        }));

        this.searchedProducts = this.products.filter(product =>
          this.productsTemp.some(product2 => product2.key?.['raw'] === product.key)
        );
        this.applyFilters();


      }, (error) => {
        console.error('Error during search:', error);
      });
    } else {
      this.searchedProducts = this.allProducts;
      this.applyFilters();
    }
  }
}
