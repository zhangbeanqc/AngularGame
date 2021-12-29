import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from "./product/product.component";
import {Code404Component} from "./code404/code404.component";
import {SellerInfoComponent} from "./seller-info/seller-info.component";
import {ProductDescComponent} from "./product-desc/product-desc.component";
import {ChatComponent} from "./chat/chat.component";
import {LoginGuard} from "./guard/login.guard";
import {UnsavedGuard} from "./guard/unsaved.guard";
import {ProductResolve} from "./guard/product.resolve";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent, outlet: 'auxRoute' },
  { path: 'product', component: ProductComponent, data: [{isProd:true}] },
  { path: 'product', component: ProductComponent },
  { path: 'productNew/:id', component: ProductComponent, children: [
      { path: 'desc', component: ProductDescComponent },
      { path: 'seller/:id', component: SellerInfoComponent }
    ]
    // ,canActivate: [LoginGuard], canDeactivate: [UnsavedGuard]
    ,resolve: {product: ProductResolve}
  },
  // canActivate can have multiple guards, validator will go through these guards one by one.
  // Only when all these guards pass, this route can be activated.
  { path: '**', component: Code404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard, UnsavedGuard, ProductResolve]
})
export class AppRoutingModule { }
