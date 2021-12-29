import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Product1Component } from './product1/product1.component';
import {ProductService} from "./shared/product.service";
import { Product2Component } from './product2/product2.component';
import {LoggerService} from "./shared/logger.service";
import { Product3Component } from './product3/product3.component';
import {AnotherProductService} from "./shared/another-product.service";
import {NewProductService} from "./shared/new-product.service";
import { Product4Component } from './product4/product4.component';

@NgModule({
  declarations: [
    AppComponent,
    Product1Component,
    Product2Component,
    Product3Component,
    Product4Component
  ],
  imports: [
    BrowserModule
  ],
  // Normal way
  // providers: [ProductService, AnotherProductService],
  // Equivalent to this
  // providers: [{ provide: ProductService, useClass: ProductService }, { provide: AnotherProductService, useClass: AnotherProductService }],

  // ProductService and AnotherProductService are using the same class, so product1 and product2 show the same product
  // providers: [{ provide: ProductService, useClass: AnotherProductService }, { provide: AnotherProductService, useClass: AnotherProductService }],

  // Main service define here, but the other services are defined in the correspondent components
  // providers: [ProductService, LoggerService],
  providers: [{ provide: ProductService, useClass: ProductService },
              { provide: AnotherProductService, useClass: AnotherProductService },
              // This is a singleton, that mean if 2 component use the same token, this factory is only invoked once
              // Both component use the same service although we have setup the condition to create possibly different
              // object in this method
              { provide: NewProductService, useFactory: (logger: LoggerService, isDev: boolean, appConfig: {isDev: boolean}) => {
                // let dev = Math.random() > 0.2;
                // if (dev) {

                // if (isDev) {

               if (appConfig.isDev) {
                  return new ProductService();
                } else {
                  return new AnotherProductService(logger);
                }
                }, deps: [LoggerService, "IS_DEV_ENV", "APP_CONFIG"] },
                { provide: "IS_DEV_ENV", useValue: false },
                { provide: "APP_CONFIG", useValue: {isDev: true} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
