import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { SearchService } from 'services/search.service';
import { Product } from 'models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy{
  products: Product[];
  productsTemp: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  displayedColumns: string[] = ['index', 'name', 'companyName', 'storages', 'color', 'imageUrl', 'price', 'highlights','promotions', 'edit'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService, private searchService: SearchService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>([]);
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator; // Move paginator initialization to ngOnInit
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getHighlights(highlights: string) {
    if (highlights) {
      const regex = /\n/g;
      let rt = highlights;
      return rt.replace(regex, "<br>");
    }
    return '';
  }

  showProduct(product) {
    console.log(product);
  }

  filter(query: string) {
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

        this.filteredProducts = this.products.filter(product =>
          this.productsTemp.some(product2 => product2.key?.['raw'] === product.key)
        );

        this.updateDataSource();
      }, (error) => {
        console.error('Error during search:', error);
      });
    } else {
      this.filteredProducts = this.products;
      this.updateDataSource();
    }
  }

  private updateDataSource() {
    this.dataSource = new MatTableDataSource<Product>(this.filteredProducts || []);
    this.dataSource.paginator = this.paginator;
  }
}
