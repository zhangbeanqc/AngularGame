import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productId1!: number;
  public productId2!: number;
  public productId3!: number;

  productId!: number;
  productName!: string;

  constructor(private routeInfo: ActivatedRoute) {

  }

  ngOnInit(): void {

    // Use subscribe to make productId3 change when we switch between anchor "Product New" and "Detail" Button.
    // Snapshot only generates ProductComponent once, that is why ngInit is called once,
    // that makes productionId2 keep the same value when switching between anchor "Product New" and "Detail" Button
    // Use this way if it is possible that an object routes to itself
    this.routeInfo.params.subscribe((params: Params) => this.productId3 = params["id"]);

    // subscribe means wait for data is ready then execute the callback
    this.routeInfo.data.subscribe((data) => {
      console.log(data);
      this.productId = data.product.id;
      this.productName = data.product.name;
    });

    this.productId1 = this.routeInfo.snapshot.queryParams["id"];
    this.productId2 = this.routeInfo.snapshot.params["id"];
  }

}

export class Product {

  constructor(public id:number, public name:string) {
  }
}
