import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { handleError } from "../shared/helpers/error-handler";
import { AccountService } from "../shared/services/account.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-match",
  templateUrl: "./match.page.html",
  styleUrls: ["./match.page.scss"],
})
export class MatchPage implements OnInit {
  eventData: any;
  imgUrl: string;
  currentUser: any;
  matchedUser: any;
  matchedUserImg: string;

  constructor(
    private accountService: AccountService,
    private toasterService: ToastrService,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.eventData = {};
    this.imgUrl = "assets/images/male.svg";
    this.currentUser = {};
    this.matchedUser = {};
    this.matchedUserImg = "assets/images/profile.svg";
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.eventData = JSON.parse(sessionStorage.getItem("currentMatch"));
    this.matchedUser =
      "userRequest" in this.eventData
        ? this.eventData.userRequest[0]?.userDetails
        : null;
    if (this.matchedUser) {
      this.matchedUserImg = this.matchedUser.profilePic;
    }

    this.accountService
      .getUsersList(localStorage.getItem("userMobile"))
      .subscribe(
        (result: any) => {
          if (result) {
            this.imgUrl =
              "profilePic" in result
                ? result.profilePic
                : "assets/images/male-white.svg";
            this.currentUser = result;
          }
        },
        (err) => {
          this.toasterService.error(handleError(err));
        }
      );
  }

  // Navigate to chatroom
  navigateToChat() {
    this.navCtrl.navigateRoot(["/home/messaging"]);
  }
}
