import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.page.html",
  styleUrls: ["./messaging.page.scss"],
})
export class MessagingPage implements OnInit {
  messages: any;

  constructor() {
    this.messages = [
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
      {
        imgUrl: "assets/images/female.svg",
        name: "Abishek Amstrong",
        msg: "lorem ipsum dollar sit...",
        time: "14:18",
      },
    ];
  }

  ngOnInit() {}
}
