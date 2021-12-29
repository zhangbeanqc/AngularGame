import { Injectable } from '@angular/core';
import {Product, ProductService} from "./product.service";
import {LoggerService} from "./logger.service";

// Can inject the other service
@Injectable({
  providedIn: 'root'
})
export class AnotherProductService implements ProductService {

  constructor(private logger: LoggerService) {
  }

  getProduct(): Product {
    this.logger.log("Get product is invoked!")
    return new Product(3, "Galaxy", 4899, "Samsung Phone");
  }
}
