import { Component, OnInit } from '@angular/core';
import { Observable, map } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataSource!:Observable<any>;
  products: Array<any> = [];

  newProducts!:Observable<any>;

  constructor(private http: HttpClient) {

    let reqHeaders: HttpHeaders = new HttpHeaders();
    // HttpHeaders is immutable, must return the new variable
    reqHeaders = reqHeaders.append('Authorization', 'Basic 123456');

    // Define a http request, but it is sent
    this.dataSource = this.http.get('/api/products', { headers: reqHeaders });
    this.newProducts = this.http.get('/api/products');
  }

  ngOnInit(): void {
    // http request is triggered by subscribe method
    this.dataSource.subscribe(
      (data) => this.products = data
    );
  }

}
