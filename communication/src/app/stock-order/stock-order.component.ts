import {Component, Input, OnInit} from '@angular/core';
import {PriceQuote} from "../price-quote/price-quote.component";

@Component({
  selector: 'app-stock-order',
  templateUrl: './stock-order.component.html',
  styleUrls: ['./stock-order.component.css']
})
export class StockOrderComponent implements OnInit {

  constructor() { }

  @Input()
  priceQuote!: PriceQuote;

  ngOnInit(): void {
  }

}
