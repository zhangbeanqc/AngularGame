import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PriceQuote} from "../price-quote/price-quote.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input()
  stockCode!: string;

  @Input()
  amount!: number;

  constructor(routeInfo: ActivatedRoute) {
    setInterval(() => {
      this.stockCode = "Apple";
    }, 3000);

    // Way #1 to get params from routes
    console.log(routeInfo.snapshot.params["something"]);

    // Way #2 to get params from routes (shared component by multiple routes)
    routeInfo.data.subscribe((data) => {
      console.log(data)
    })
  }

  ngOnInit(): void {
  }

}
