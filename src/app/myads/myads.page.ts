import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { AccountService } from "src/app/shared/services/account.service";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import * as moment from "moment";

@Component({
  selector: "app-myads",
  templateUrl: "./myads.page.html",
  styleUrls: ["./myads.page.scss"],
})
export class MyadsPage implements OnInit {
  events: any;
  selectedTabIndex: number;
  slideOpts: any;
  @ViewChild("slider") slider: IonSlides;
  cards;

  constructor(
    private accountService: AccountService,
    private toasterService: ToastrService
  ) {
    this.selectedTabIndex = 0;
    this.slideOpts = {};
    this.cards = [];
  }

  ionViewWillEnter() {
    if (this.selectedTabIndex === 0) {
      this.getAllEvents();
    } else if (this.selectedTabIndex === 1) {
      this.getPendingEvents();
    }
  }

  ngOnInit() {}

  // To get all the pending events
  getPendingEvents() {
    this.accountService
      .getPendingEventsList(localStorage.getItem("userMobile"))
      .subscribe(
        (result: any[]) => {
          const eventsList = result
            .filter(
              (eventObj) =>
                (eventObj.createdBy &&
                  eventObj.createdBy != localStorage.getItem("userMobile")) ||
                (eventObj.createdBy === localStorage.getItem("userMobile") &&
                  "userRequest" in eventObj &&
                  eventObj.userRequest.length)
            )
            .map((event: any) => {
              return {
                ...event,
                eventID: event._id,
                img: event.imgUrl ? event.imgUrl : "assets/images/BBQ.jpg",
                eventTitle:
                  event.eventName +
                  " " +
                  moment(event.eventDateTime).format("ddd hh:mm") +
                  " IST",
                eventLocation: event.location,
                description: event.eventName,
                eventDate: moment(event.eventDateTime).format("DD MMM YYYY"),
              };
            });
          this.cards = eventsList;
        },
        (err) => {
          this.toasterService.error(handleError(err));
        }
      );
  }

  // To get the list of all events
  getAllEvents() {
    const userId = localStorage.getItem("userMobile");
    console.log(userId);
    this.accountService.getUsersList(userId).subscribe(
      (result: any) => {
        console.log(result);
        if (result) {
          this.accountService.getMyEvents(result._id).subscribe(
            (events: any[]) => {
              this.events = events.map((event: any) => {
                return {
                  ...event,
                  imgUrl: "assets/images/profile.svg",
                  location: event.eventLocation,
                  eventDate: moment(event.eventDateTime).format("ddd Do MMM"),
                  time: moment(event.eventDateTime).format("LT"),
                  hostName: result.userName,
                  going: event.eventWith.length,
                };
              });
            },
            (err) => {
              this.toasterService.error(handleError(err));
            }
          );
        }
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }

  // To handle tab change
  onTabChanged(event) {
    console.log(event);
    this.selectedTabIndex = event.index;

    if (this.selectedTabIndex === 0) {
      this.getAllEvents();
    } else if (this.selectedTabIndex === 1) {
      this.getPendingEvents();
    }
  }

  // To update page if event is rejected in child
  refreshPendingEvents(event) {
    console.log(event);
    if (event) {
      this.getPendingEvents();
    }
  }
}
