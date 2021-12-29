import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { PriceQuoteComponent } from './price-quote/price-quote.component';
import { StockOrderComponent } from './stock-order/stock-order.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    PriceQuoteComponent,
    StockOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
