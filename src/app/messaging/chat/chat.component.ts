import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  profiles: any;
  slideOpts;
  chats;

  constructor() {
    this.slideOpts = {
      initialSlide: 1,
      speed: 400,
      slidesPerView: 5,
    };
    this.chats = [];
    this.profiles = [];
  }

  ionViewWillEnter() {
    this.profiles = [
      { name: "Abishek Amstrong", imgUrl: "" },
      { name: "Abishek Amstrong", imgUrl: "" },
      { name: "Abishek Amstrong", imgUrl: "" },
      { name: "Abishek Amstrong", imgUrl: "" },
      { name: "Abishek Amstrong", imgUrl: "" },
      { name: "Abishek Amstrong", imgUrl: "" },
      { name: "Abishek Amstrong", imgUrl: "" },
      { name: "Abishek Amstrong", imgUrl: "" },
    ];
    this.chats = [
      {
        msg: "Lorem ipsum dolor sit amet.",
        from: "him",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor sit amet.",
        from: "me",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        from: "him",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor sit.",
        from: "him",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor sit amet consectetur.",
        from: "me",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor sit.",
        from: "him",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor.",
        from: "me",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor sit amet consectetur.",
        from: "me",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor.",
        from: "him",
        time: "14:10",
      },
      {
        msg: "Lorem ipsum dolor sit amet consectetur.",
        from: "me",
        time: "14:10",
      },
    ];
  }

  ngOnInit() {}
}
