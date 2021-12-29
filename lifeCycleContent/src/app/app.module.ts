import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import {RouterModule, Routes} from "@angular/router";
import { Child1Component } from './child1/child1.component';

const routeConfig: Routes = [
  { path: 'child', component: ChildComponent },
  { path: 'child1', component: Child1Component }
]

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    Child1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
