import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { AccountService } from "src/app/shared/services/account.service";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  slideOpts: any;
  @ViewChild("slider") slider: IonSlides;
  userInfo: any = {};
  imgUrl: string;

  constructor(
    private accountService: AccountService,
    private toasterService: ToastrService,
    private router: Router
  ) {
    this.imgUrl = "assets/images/male-white.svg";
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.accountService
      .getUsersList(localStorage.getItem("userMobile"))
      .subscribe(
        (result: any) => {
          console.log(result);
          this.imgUrl =
            "profilePic" in result
              ? result.profilePic
              : "assets/images/male-white.svg";
          this.userInfo = result;
        },
        (err) => {
          this.toasterService.error(handleError(err));
        }
      );
  }

  nextSlide() {
    console.log(this.slider);
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  navToProfileUpdate() {
    this.router.navigate(["/", "profile", "update"]);
  }
}
