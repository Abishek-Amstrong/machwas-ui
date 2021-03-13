import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/shared/services/account.service";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { HTTP } from "@ionic-native/http/ngx";
import { isPlatform, NavController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.page.html",
  styleUrls: ["./activities.page.scss"],
})
export class ActivitiesPage implements OnInit {
  activities: any;
  userName: string;
  appid: string;
  searchText: string;
  originalActivities: any;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toasterService: ToastrService,
    private nativeHttp: HTTP,
    private http: HttpClient,
    private navCtrl: NavController
  ) {
    this.userName = localStorage.getItem("userName");
    this.searchText = "";
    this.originalActivities = [];
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.accountService.getEventsList().subscribe(
      (result: any) => {
        this.activities = result;
        this.originalActivities = result;
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }

  displayCardDetails(activity: string, imgUrl: string) {
    this.navCtrl.navigateRoot([
      "/home/event",
      {
        title: activity,
        imgUrl: imgUrl,
      },
    ]);
  }

  // To filter the activities based on entered text
  setFilteredItems(event: any) {
    const query = event.target.value.toLowerCase();
    this.activities = this.originalActivities.filter((event) =>
      event.eventName.toLowerCase().includes(query.toLowerCase())
    );
  }
}
