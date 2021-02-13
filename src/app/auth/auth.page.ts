import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { ToastrService } from "ngx-toastr";
import { handleError } from "../shared/helpers/error-handler";
import { AccountService } from "../shared/services/account.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  userName: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private accountService: AccountService,
    private toasterService: ToastrService
  ) {
    this.userName = "";
  }

  ngOnInit() {}

  navToActivities() {
    localStorage.setItem("userMobile", "9500156799");
    this.router.navigate(["/", "home", "activities"]);
  }

  // To login with mobile
  loginWithPhone() {
    this.router.navigate(["/", "auth", "login"]);
  }

  // To login with Insta
  loginWithInsta() {
    this.accountService.loginWithInsta().subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }

  async navToRegister() {
    if (this.userName) {
      this.router.navigate(["/", "auth", "register", this.userName]);
    } else {
      const toast = await this.toastController.create({
        position: "top",
        message: "Please enter name to proceed!",
        duration: 1000,
      });

      toast.present();
    }
  }
}
