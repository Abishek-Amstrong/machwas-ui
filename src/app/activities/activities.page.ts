import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/shared/services/account.service";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.page.html",
  styleUrls: ["./activities.page.scss"],
})
export class ActivitiesPage implements OnInit {
  activities: any;

  constructor(private router: Router, private accountService: AccountService, private toasterService: ToastrService) {
    // this.activities = [
    //   { imageUrl: "assets/images/go-out.jpg", title: "Go Out" },
    //   { imageUrl: "assets/images/travel.jpg", title: "Travel" },
    //   { imageUrl: "assets/images/soccer.jpg", title: "Football" },
    //   { imageUrl: "assets/images/badminton.jpg", title: "Badminton" },
    //   { imageUrl: "assets/images/tennis.jpg", title: "Tennis" },
    //   { imageUrl: "assets/images/learning.jpg", title: "Learning" },
    //   { imageUrl: "assets/images/museum.jpg", title: "Museum" },
    //   { imageUrl: "assets/images/learn.jpg", title: "Lernen" },
    //   { imageUrl: "assets/images/shisha.jpg", title: "Shisha" },
    //   { imageUrl: "assets/images/read.jpg", title: "Lesen" },
    // ];
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

  displayCardDetails(activity: string) {
    this.router.navigate(["/", "home", "event", activity]);
  }
}
