import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-events",
  templateUrl: "./events.page.html",
  styleUrls: ["./events.page.scss"],
})
export class EventsPage implements OnInit {
  slideOpts: any;
  @ViewChild("slider") slider: IonSlides;
  cards;

  constructor() {
    this.slideOpts = {};
    this.cards = [];
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.cards = [
      {
        eventID: 1,
        img: "assets/images/badminton.jpg",
        eventTitle: "Badminton Sat 17:00 IST",
        location: "Chennai",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        eventDate: "20 March 2020",
      },
      {
        eventID: 2,
        img: "assets/images/tennis.jpg",
        eventTitle: "Tennis Sat 17:00 IST",
        location: "Delhi",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        eventDate: "20 March 2020",
      },
      {
        eventID: 3,
        img: "assets/images/soccer.jpg",
        eventTitle: "Soccer Sat 17:00 IST",
        location: "Mumbai",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        eventDate: "20 March 2020",
      },
    ];
  }

  // nextSlide() {
  //   this.slider.slideNext();
  // }

  // previousSlide() {
  //   this.slider.slidePrev();
  // }
}
