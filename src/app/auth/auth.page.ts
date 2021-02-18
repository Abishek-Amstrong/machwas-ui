import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IonNav, NavController, ToastController } from "@ionic/angular";
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
  frameSrc: any;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private accountService: AccountService,
    private toasterService: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.userName = "";
    this.frameSrc = "";
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
    console.log("testing");
    this.accountService.loginWithInsta().subscribe(
      (result: any) => {
        console.log(result);
        const replacedHref = result.replaceAll(
          'href="/',
          'href="https://www.instagram.com/'
        );
        const replacedSrc = replacedHref.replaceAll(
          'src="/',
          'href="https://www.instagram.com/'
        );
        console.log(replacedSrc);
        this.frameSrc = this.sanitizer.bypassSecurityTrustHtml(replacedSrc);
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
