import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { Router } from "@angular/router";
import { AccountService } from "src/app/shared/services/account.service";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import * as moment from "moment";

@Component({
  selector: "app-events",
  templateUrl: "./events.page.html",
  styleUrls: ["./events.page.scss"],
})
export class EventsPage implements OnInit {
  slideOpts: any;
  @ViewChild("slider") slider: IonSlides;
  cards;

  constructor(
    private accountService: AccountService,
    private toasterService: ToastrService
  ) {
    this.slideOpts = {};
    this.cards = [];
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.accountService
      .getPendingEventsList(localStorage.getItem("userMobile"))
      .subscribe(
        (result: any[]) => {
          const eventsList = result.map((event: any) => {
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
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
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
}
