import {CanActivate} from "@angular/router";

export class LoginGuard implements CanActivate {

  canActivate() {

    let loggedIn: boolean = Math.random() < 0.3;

    console.log(loggedIn);

    if (!loggedIn) {
      console.log("User didn't login");
    }

    return loggedIn;
  }

}
