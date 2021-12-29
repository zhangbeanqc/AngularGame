import { Component } from '@angular/core';
import {PriceQuote} from "./price-quote/price-quote.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  stock: string = "";

  priceQuote: PriceQuote = new PriceQuote("", 0);

  priceQuoteStatic: PriceQuote = new PriceQuote("", 0);

  priceQuoteHandler(event: PriceQuote) {
    this.priceQuote = event;
  }

  buyStockHandler(event: PriceQuote) {
    this.priceQuoteStatic = event;
  }
}
