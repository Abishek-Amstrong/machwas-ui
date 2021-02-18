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
              img: event.imgUrl,
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
    // this.cards = [
    //   {
    //     eventID: 1,
    //     img: "assets/images/badminton.jpg",
    //     eventTitle: "Badminton Sat 17:00 IST",
    //     location: "Chennai",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     eventDate: "20 March 2020",
    //   },
    //   {
    //     eventID: 2,
    //     img: "assets/images/tennis.jpg",
    //     eventTitle: "Tennis Sat 17:00 IST",
    //     location: "Delhi",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     eventDate: "20 March 2020",
    //   },
    //   {
    //     eventID: 3,
    //     img: "assets/images/soccer.jpg",
    //     eventTitle: "Soccer Sat 17:00 IST",
    //     location: "Mumbai",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     eventDate: "20 March 2020",
    //   },
    // ];
  }

  // nextSlide() {
  //   this.slider.slideNext();
  // }

  // previousSlide() {
  //   this.slider.slidePrev();
  // }
}
