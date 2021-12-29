import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Product} from "../product/product.component";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductResolve implements Resolve<Product> {

  constructor(private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {

    let productId: number = route.params["id"];

    if (productId == 1) {
      return new Product(1, "iPhone7");
    } else {
      this.router.navigate(['/home']);
    }
    return new Product(-1, "Nothing");
  }
}
