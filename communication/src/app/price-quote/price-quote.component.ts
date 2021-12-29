import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-price-quote',
  templateUrl: './price-quote.component.html',
  styleUrls: ['./price-quote.component.css']
})
export class PriceQuoteComponent implements OnInit {

  stockCode: string = "IBM";

  price!: number;

  @Output('buyStock')
  buy: EventEmitter<PriceQuote> = new EventEmitter<PriceQuote>();

  @Output('priceChange')
  lastPrice: EventEmitter<PriceQuote> = new EventEmitter<PriceQuote>();

  constructor() {
    setInterval(() => {

      const priceQuote = new PriceQuote(this.stockCode, 100 * Math.random());

      this.price = priceQuote.lastPrice;

      this.lastPrice.emit(priceQuote);
    }, 3000);
  }

  ngOnInit(): void {
  }

  buyStock(event: Event) {
    this.buy.emit(new PriceQuote(this.stockCode, this.price));
  }
}

export class PriceQuote {

  constructor(public stockCode: string, public lastPrice: number) {
  }
}

