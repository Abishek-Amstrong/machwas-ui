import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/shared/services/account.service";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { CometChat } from "@cometchat-pro/cordova-ionic-chat";
import { HTTP } from "@ionic-native/http/ngx";
import { isPlatform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.page.html",
  styleUrls: ["./activities.page.scss"],
})
export class ActivitiesPage implements OnInit {
  activities: any;
  apiKey: string;
  uid: string;
  userName: string;
  appid: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toasterService: ToastrService,
    private nativeHttp: HTTP,
    private http: HttpClient
  ) {
    this.apiKey = "64d17c2f6e06f9b156dd5088b9a561a41ffb477e";
    this.uid = localStorage.getItem("userMobile");
    this.userName = localStorage.getItem("userName");
    this.appid = "29851b1adf4c854";
  }

  ngOnInit() {
    this.accountService.getEventsList().subscribe(
      (result) => {
        this.activities = result;
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }

  ionViewWillEnter() {
    // this.chatLogin();
  }

  // To login user to his chatroom
  chatLogin() {
    console.log(isPlatform("mobileweb"));
    if (isPlatform("mobileweb")) {
      // this.http
      //   .get(`https://api-in.cometchat.io/v2.0/users/${this.uid}/auth_tokens`, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       apiKey: this.apiKey,
      //       "Access-Control-Allow-Origin": "*",
      //       appid: this.appid,
      //     },
      //   })
      //   .subscribe(
      //     (user) => {
      //       console.log("Login Successful:", { user });
      //     },
      //     (error) => {
      //       this.chatRegister();
      //     }
      //   );
      CometChat.login(this.uid, this.apiKey).then(
        (user) => {
          console.log("Login Successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    } else {
      this.nativeHttp
        .get(
          `https://api-in.cometchat.io/v2.0/users/${this.uid}/auth_tokens`,
          {},
          { "Content-Type": "application/json", apiKey: this.apiKey }
        )
        .then(
          (user) => {
            console.log("Login Successful:", { user });
          },
          (error) => {
            this.chatRegister();
          }
        );
    }
  }

  // To register the user to a new chatroom
  chatRegister() {
    const user = new CometChat.User(this.uid);
    user.setName(this.userName);

    CometChat.createUser(user, this.apiKey).then(
      (user) => {
        console.log("user created", user);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  displayCardDetails(activity: string, imgUrl: string) {
    this.router.navigate(["/", "home", "event", activity, imgUrl]);
  }
}
