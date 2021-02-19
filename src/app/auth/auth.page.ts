import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IonNav, NavController, ToastController } from "@ionic/angular";
import { ToastrService } from "ngx-toastr";
import { handleError } from "../shared/helpers/error-handler";
import { AccountService } from "../shared/services/account.service";
import {
  FacebookLoginPlugin,
  FacebookLogin,
} from "@capacitor-community/facebook-login";
import { Plugins, registerWebPlugin } from "@capacitor/core";
import { isPlatform } from "@ionic/angular";
import { FacebookLoginResponse } from "@capacitor-community/facebook-login";
import { HttpClient } from "@angular/common/http";
registerWebPlugin(FacebookLogin);

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  userName: string;
  frameSrc: any;
  fbLogin: FacebookLoginPlugin;
  token;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private accountService: AccountService,
    private toasterService: ToastrService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.userName = "";
    this.frameSrc = "";
    this.token = null;
    this.setupFbLogin();
  }

  // To initialize FbLogin component
  setupFbLogin() {
    if (isPlatform("desktop")) {
      this.fbLogin = FacebookLogin;
    } else {
      const { FacebookLogin } = Plugins;

      this.fbLogin = FacebookLogin;
    }
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

  // To login with facebook
  async loginWithFB() {
    const FACEBOOK_PERMISSIONS = [
      "email",
      "user_birthday",
      "user_photos",
      "user_gender",
    ];
    const result = await this.fbLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });

    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      // Login successful.
      this.loadUserData();
    } else if (result.accessToken && !result.accessToken.userId) {
      // Cancelled by user.
      this.getCurrentToken();
    } else {
      console.log("Login failed");
    }
  }

  async getCurrentToken() {
    const result = await this.fbLogin.getCurrentAccessToken();
    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData();
    } else {
      // Not logged in.
    }
  }

  async loadUserData() {
    const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
    this.http.get(url).subscribe((res: any) => {
      const payload = {
        userId: Number(res.id),
        userName: res.name,
        mobileNo: "",
        email: res.email,
        userDOB: res.birthday,
        employment: "",
        description: "",
      };
      this.accountService.thirdPartyLogin(payload).subscribe(
        (result: any) => {
          localStorage.setItem("userMobile", result._id);
          this.router.navigate(["/", "home", "activities"]);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  async logout() {
    await this.fbLogin.logout();
    this.token = null;
  }

  // To login with Insta
  // loginWithInsta() {
  //   console.log("testing");
  //   this.accountService.loginWithInsta().subscribe(
  //     (result: any) => {
  //       console.log(result);
  //       const replacedHref = result.replaceAll(
  //         'href="/',
  //         'href="https://www.instagram.com/'
  //       );
  //       const replacedSrc = replacedHref.replaceAll(
  //         'src="/',
  //         'href="https://www.instagram.com/'
  //       );
  //       console.log(replacedSrc);
  //       this.frameSrc = this.sanitizer.bypassSecurityTrustHtml(replacedSrc);
  //     },
  //     (err) => {
  //       this.toasterService.error(handleError(err));
  //     }
  //   );
  // }

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
