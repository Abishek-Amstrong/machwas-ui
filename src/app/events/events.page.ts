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

  constructor() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
  }

  ngOnInit() {}
}
