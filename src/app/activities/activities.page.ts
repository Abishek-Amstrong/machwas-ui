import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.page.html",
  styleUrls: ["./activities.page.scss"],
})
export class ActivitiesPage implements OnInit {
  activities: any;

  constructor() {
    this.activities = [
      { imageUrl: "assets/images/go-out.jpg", title: "Go Out" },
      { imageUrl: "assets/images/travel.jpg", title: "Travel" },
      { imageUrl: "assets/images/soccer.jpg", title: "Football" },
      { imageUrl: "assets/images/badminton.jpg", title: "Badminton" },
      { imageUrl: "assets/images/tennis.jpg", title: "Tennis" },
      { imageUrl: "assets/images/learning.jpg", title: "Learning" },
      { imageUrl: "assets/images/museum.jpg", title: "Museum" },
      { imageUrl: "assets/images/learn.jpg", title: "Lernen" },
      { imageUrl: "assets/images/shisha.jpg", title: "Shisha" },
      { imageUrl: "assets/images/read.jpg", title: "Lesen" },
    ];
  }

  ngOnInit() {}
}
