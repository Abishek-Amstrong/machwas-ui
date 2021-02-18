import { Component, OnInit } from "@angular/core";
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

  constructor(
    private accountService: AccountService,
    private toasterService: ToastrService
  ) {
    // this.events = [
    //   {
    //     imgUrl: "assets/images/male-white.svg",
    //     location: "Soccer, Holiday Inn, Chennai",
    //     eventDate: "Sat, 6th Jan",
    //     time: "04:00 PM",
    //     hostName: "Ganesh",
    //     going: 3,
    //   },
    //   {
    //     imgUrl: "assets/images/profile.svg",
    //     location: "Badminton, Radison Blu, Delhi",
    //     eventDate: "Thu, 17th Dec",
    //     time: "07:00 PM",
    //     hostName: "Deepak",
    //     going: 5,
    //   },
    //   {
    //     imgUrl: "assets/images/female-white.svg",
    //     location: "Tennis, ITC Grand Chola, Mumbai",
    //     eventDate: "Wed, 19th Sep",
    //     time: "05:00 PM",
    //     hostName: "Nikesh",
    //     going: 1,
    //   },
    //   {
    //     imgUrl: "assets/images/male-white.svg",
    //     location: "Cricket, Burj Khalifa, Bihar",
    //     eventDate: "Sat, 12th Aug",
    //     time: "02:00 PM",
    //     hostName: "Akash",
    //     going: 7,
    //   },
    // ];
  }

  ngOnInit() {
    const userId = localStorage.getItem("userMobile");
    console.log(userId);
    this.accountService.getUsersList(userId).subscribe(
      (result: any) => {
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
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }
}
