import { Injectable } from '@angular/core';
import {Product} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor() { }

  getProduct() {
    return new Product(0, "", 0, "");
  }
}
