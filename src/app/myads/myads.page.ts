import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-myads",
  templateUrl: "./myads.page.html",
  styleUrls: ["./myads.page.scss"],
})
export class MyadsPage implements OnInit {
  events: any;

  constructor() {
    this.events = [
      {
        imgUrl: "assets/images/male-white.svg",
        location: "Soccer, Holiday Inn, Chennai",
        eventDate: "Sat, 6th Jan",
        time: "04:00 PM",
        hostName: "Ganesh",
        going: 3,
      },
      {
        imgUrl: "assets/images/profile.svg",
        location: "Badminton, Radison Blu, Delhi",
        eventDate: "Thu, 17th Dec",
        time: "07:00 PM",
        hostName: "Deepak",
        going: 5,
      },
      {
        imgUrl: "assets/images/female-white.svg",
        location: "Tennis, ITC Grand Chola, Mumbai",
        eventDate: "Wed, 19th Sep",
        time: "05:00 PM",
        hostName: "Nikesh",
        going: 1,
      },
      {
        imgUrl: "assets/images/male-white.svg",
        location: "Cricket, Burj Khalifa, Bihar",
        eventDate: "Sat, 12th Aug",
        time: "02:00 PM",
        hostName: "Akash",
        going: 7,
      },
    ];
  }

  ngOnInit() {}
}
