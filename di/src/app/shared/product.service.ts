import { Injectable } from '@angular/core';

// Can inject the other service
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProduct(): Product {
    return new Product(1, "iPhone12", 5899, "Apple Smart Phone")
  }
}

export class Product {

  constructor(public id: number,
              public title: string,
              public price: number,
              public desc: string) {
  }
}
