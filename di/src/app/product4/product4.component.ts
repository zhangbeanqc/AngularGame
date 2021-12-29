import {Component, Injector, OnInit} from '@angular/core';
import {Product, ProductService} from "../shared/product.service";
import {NewProductService} from "../shared/new-product.service";

@Component({
  selector: 'app-product4',
  templateUrl: './product4.component.html',
  styleUrls: ['./product4.component.css']
})
export class Product4Component implements OnInit {

  private productService: ProductService;

  // Manually use injector to inject the desired service
  // Not recommend to use this way
  constructor(private injector: Injector) {
    this.productService = <ProductService> injector.get(ProductService);
  }

  product!: Product;

  ngOnInit(): void {
    this.product = this.productService.getProduct();
  }

}
