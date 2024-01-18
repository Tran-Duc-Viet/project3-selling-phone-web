import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSpecService } from 'services/product-spec.service';
import { ProductService } from 'services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] // Correct the property name to 'styleUrls'
})
export class ProductDetailsComponent implements OnInit {
  id;
  productValue;
  productDetails;

  constructor(private route: ActivatedRoute, private productService: ProductService, private productSpecService: ProductSpecService){
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.productService.get(this.id).then((product) => {
      this.productValue = product;
      this.getProductSpecifications(this.productValue.companyName, this.productValue.name);
    });
  }

  getProductSpecifications(brand, productName) {
    this.productSpecService.getProductSpec(brand as string, productName as string).subscribe((data) => {

      this.productDetails = data;
    });
  }

  getHighlights(highlights: string) {
  if (highlights) {
    const regex = /\n/g;
    let rt = highlights;

    return rt.replace(regex, "<br>"); // Return the string with replaced newline characters
  }
  return '';
}

  getMainCamera(mainCamera: any[]): string {
    let camera = Object.keys(mainCamera).find((key) => {
        return (!key.includes("mainCameraFeatures") && !key.includes("mainCameraVideos"));
    });

    let cameraValue = mainCamera[camera!];

    return cameraValue;
}

  getSelfieCamera(selfieCamera: any[]): string{
    let camera = Object.keys(selfieCamera).find((key) => {
        return (!key.includes("selfieCameraFeatures") && !key.includes("selfieCameraVideos"));
    });

    let cameraValue = selfieCamera[camera!];

    return cameraValue;
  }

  replaceWithBR(highlights: string){
    if (highlights) {
    const regex = /\\n/g;
    let rt = highlights;

    return rt.replace(regex, "<br>"); // Return the string with replaced newline characters
  }
  return '';
  }
}
