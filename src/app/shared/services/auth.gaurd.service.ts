import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AccountService } from "./account.service";

@Injectable({
  providedIn: "root",
})
export class AuthGaurdService {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    console.log(user);

    if (user) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/auth/landing"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
