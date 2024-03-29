import {
  Component,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { AccountService } from "src/app/shared/services/account.service";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { filter } from "minimatch";

@Component({
  selector: "swipe-ui",
  templateUrl: "./event-swipe.component.html",
  styleUrls: ["./event-swipe.component.scss"],
})
export class TinderUIComponent {
  @Input("cards") cards: Array<{
    img: string;
    eventTitle: string;
    eventID: any;
    location: string;
    description: string;
    eventDate: string;
  }>;

  @ViewChildren("tinderCard") tinderCards: QueryList<ElementRef>;
  @ViewChild("slider") slider: IonSlides;
  tinderCardsArray: Array<ElementRef>;

  @Output() choiceMade = new EventEmitter();
  profiles: any;

  moveOutWidth: number;
  shiftRequired: boolean;
  transitionInProgress: boolean;
  heartVisible: boolean;
  crossVisible: boolean;
  slideOpts: any;
  currentAction: string;
  previousCard: any;
  isLater: boolean;

  constructor(
    private renderer: Renderer2,
    private accountService: AccountService,
    private toasterService: ToastrService
  ) {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 3,
    };

    this.profiles = [
      { imgUrl: "assets/images/male-white.svg" },
      { imgUrl: "assets/images/profile.svg" },
      { imgUrl: "assets/images/female-white.svg" },
      // { imgUrl: "assets/images/male-white.svg" },
      // { imgUrl: "assets/images/profile.svg" },
      // { imgUrl: "assets/images/female-white.svg" },
    ];

    this.currentAction = "";
    this.previousCard = null;
    this.isLater = false;
  }

  userClickedButton(event, heart, later, action) {
    this.currentAction = action;
    event.preventDefault();
    if (!this.cards.length) return false;
    if (heart) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        "transform",
        "translate(" + this.moveOutWidth + "px, -100px) rotate(-30deg)"
      );
      this.toggleChoiceIndicator(false, true);
      this.emitChoice(heart, this.cards[0]);
      this.isLater = false;
    } else if (later) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        "transform",
        "translate(-" + this.moveOutWidth + "px, -100px) rotate(30deg)"
      );
      this.toggleChoiceIndicator(true, false);
      this.emitChoice(heart, this.cards[0]);
      this.isLater = true;
    } else {
      this.isLater = false;
      this.shiftRequired = true;
      this.handleShift();
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;

    // const status = this.currentAction === "right" ? "accepted" : "rejected";
    // const request = {
    //   eventStatus: status,
    //   id: this.previousCard._id
    // }
    // this.accountService.updateAcceptOrReject(request).subscribe(
    //   (result) => {
    //     // this.activities = result;
    //   },
    //   (err) => {
    //     this.toasterService.error(handleError(err));
    //   }
    // );
  }

  handlePan(event) {
    if (
      event.deltaX === 0 ||
      (event.center.x === 0 && event.center.y === 0) ||
      !this.cards.length
    )
      return;

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, "moving");

    if (event.deltaX > 0) {
      this.toggleChoiceIndicator(false, true);
    }
    if (event.deltaX < 0) {
      this.toggleChoiceIndicator(true, false);
    }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.tinderCardsArray[0].nativeElement,
      "transform",
      "translate(" +
        event.deltaX +
        "px, " +
        event.deltaY +
        "px) rotate(" +
        rotate +
        "deg)"
    );

    this.shiftRequired = true;
  }

  handlePanEnd(event) {
    this.toggleChoiceIndicator(false, false);

    if (!this.cards.length) return;

    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, "moving");

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        "transform",
        ""
      );
      this.shiftRequired = false;
    } else {
      let endX = Math.max(
        Math.abs(event.velocityX) * this.moveOutWidth,
        this.moveOutWidth
      );
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        "transform",
        "translate(" +
          toX +
          "px, " +
          (toY + event.deltaY) +
          "px) rotate(" +
          rotate +
          "deg)"
      );

      this.shiftRequired = true;

      if (!!(event.deltaX > 0)) {
        this.isLater = false;
        this.currentAction = "right";
      } else {
        this.isLater = true;
        this.currentAction = "left";
      }

      this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
    }
    this.transitionInProgress = true;
  }

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  }

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired && this.currentAction === "return") {
      this.shiftRequired = false;
      if (this.previousCard) {
        const index = this.cards.findIndex(
          (card) => card.eventID === this.previousCard.eventID
        );
        if (index === -1) {
          this.cards.unshift(this.previousCard);
        } else {
          this.cards.splice(index, 1);
          this.cards.unshift(this.previousCard);
        }
      }
      this.previousCard = null;
    } else if (this.shiftRequired) {
      this.shiftRequired = false;
      this.previousCard = this.cards.shift();

      if (this.isLater && this.cards.length) {
        this.cards.push(this.previousCard);
      }
    }

    const status = this.currentAction === "right" ? "accepted" : "rejected";
    console.log(this.previousCard);
    if (this.previousCard) {
      const request = {
        eventStatus: status,
        id: this.previousCard._id,
      };
      console.log(request);
      this.accountService.updateAcceptOrReject(request).subscribe(
        (result) => {
          // this.activities = result;
        },
        (err) => {
          this.toasterService.error(handleError(err));
        }
      );
    }
  }

  emitChoice(heart, card) {
    this.choiceMade.emit({
      choice: heart,
      payload: card,
    });
  }

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
    });
  }

  ionSlideWillChange(event: Event) {
    event.stopPropagation();
  }

  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }
}
