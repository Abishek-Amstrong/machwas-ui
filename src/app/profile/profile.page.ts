import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  slideOpts: any;
  @ViewChild("slider") slider: IonSlides;

  constructor() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
  }

  ngOnInit() {}

  nextSlide() {
    console.log(this.slider);
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }
}
