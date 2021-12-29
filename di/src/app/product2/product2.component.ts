import { Component, OnInit } from '@angular/core';
import {AnotherProductService} from "../shared/another-product.service";
import {Product, ProductService} from "../shared/product.service";

@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.css'],
  // Use this ProductService token but refer to different service
  providers: [{ provide: ProductService, useClass: AnotherProductService }],
})
export class Product2Component implements OnInit {

  product!: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.product = this.productService.getProduct();
  }

}
