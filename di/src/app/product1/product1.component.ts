import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../shared/product.service";

@Component({
  selector: 'app-product1',
  templateUrl: './product1.component.html',
  styleUrls: ['./product1.component.css']
})
export class Product1Component implements OnInit {

  public product!: Product;

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.product = this.productService.getProduct();
  }

}
