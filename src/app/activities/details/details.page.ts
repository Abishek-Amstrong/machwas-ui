import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { concat, fromEvent, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { AccountService } from "src/app/shared/services/account.service";

export class User {
  constructor(
    public imgUrl: string,
    public age: number,
    public name: string,
    public selected?: boolean
  ) {
    if (selected === undefined) selected = false;
  }
}

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
})
export class DetailsPage implements OnInit {
  eventForm: FormGroup;
  submitted: boolean;
  friends: any = [
    // new User("assets/images/male.svg", 17, "Akash Solanki"),
    // new User("assets/images/female.svg", 22, "Avinash Dubey"),
    // new User("assets/images/profile.svg", 26, "Nikesh Gupta"),
    // new User("assets/images/male.svg", 19, "Pawan Kalyan"),
    // new User("assets/images/female.svg", 21, "Ram Ganesh"),
    // new User("assets/images/profile.svg", 32, "Rahul Singh"),
  ];
  selectedFriends: User[] = new Array<User>();
  filteredFriends: Observable<User[]>;
  lastFilter: string = "";
  activity: string = "";
  userInfo: any;
  imgUrl: string;
  userId: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toasterService: ToastrService
  ) {
    this.submitted = false;
    this.imgUrl = "";
    this.userId = localStorage.getItem("userMobile");
    this.eventForm = this.formBuilder.group({
      eventTime: ["", [Validators.required]],
      friendsList: ["", [Validators.required]],
      location: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // To get the user data
    this.accountService
      .getUsersList(localStorage.getItem("userMobile"))
      .subscribe(
        (result) => {
          this.userInfo = result;
        },
        (err) => {
          this.toasterService.error(handleError(err));
        }
      );

    this.route.params.subscribe((params) => {
      this.activity = params["title"];
      this.imgUrl = params["imgUrl"];
    });

    // To get the list of friends
    this.accountService.getFriendList().subscribe(
      (result: any[]) => {
        const setSelectedAsFalse = result.map((e: any) => ({
          ...e,
          age: 26,
          imgUrl: e.profilePic ? e.profilePic : "assets/images/profile.svg",
        }));
        this.friends = setSelectedAsFalse.filter(
          (friend) => friend._id != this.userId
        );
        this.filteredFriends = this.eventForm
          .get("friendsList")
          .valueChanges.pipe(
            startWith<string | User[]>(""),
            map((value) =>
              typeof value === "string" ? value : this.lastFilter
            ),
            map((filter) => this._filter(filter))
          );
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }

  // To open bottom sheet
  openBottomSheet(): void {
    this.bottomSheet
      .open(BottomSheetOverviewSheet)
      .afterDismissed()
      .subscribe(
        (result) => {
          if (result) {
            this.friends.push(
              new User(
                "assets/images/male.svg",
                result.age,
                result.userName,
                true
              )
            );
            this.selectedFriends.push(this.friends[this.friends.length - 1]);
            this.eventForm.get("friendsList").setValue(this.selectedFriends);
          }
        },
        (err) => console.log(err)
      );
  }

  private _filter(filter: string): User[] {
    this.lastFilter = filter;
    if (filter) {
      return this.friends.filter((option) => {
        return option.userName.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.friends.slice();
    }
  }

  // Display function to format the user list
  displayFn(value: any[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((user, index) => {
        if (index === 0) {
          displayValue = user.userName;
        } else {
          displayValue += ", " + user.userName;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, user: User) {
    event.stopPropagation();
    this.toggleSelection(user);
  }

  // Update user selection upon selecting the user from drop down
  toggleSelection(user: any) {
    user.selected = !user.selected;
    if (user.selected) {
      this.selectedFriends.push(user);
    } else {
      const i = this.selectedFriends.findIndex(
        (value: any) => value.userName === user.userName
      );
      this.selectedFriends.splice(i, 1);
    }

    this.eventForm.get("friendsList").setValue(this.selectedFriends);
  }

  // To navigate to pending events page
  displayPendingEvents() {
    this.router.navigate(["/", "home", "events"]);
  }

  // To navigate to events page upon successful event creation
  navToEvents() {
    const { friendsList, eventTime, location } = this.eventForm.getRawValue();
    console.log(this.eventForm.getRawValue());
    console.log(friendsList);
    const params = {
      eventDateTime: eventTime,
      eventWith: friendsList,
      eventLocation: location,
      eventName: this.activity,
      userId: localStorage.getItem("userMobile"),
      imgUrl: this.imgUrl,
      eventStatus: "open",
      eventLimit: 3,
    };
    this.accountService.createEvent(params).subscribe(
      (result) => {
        // this.activities = result;
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
    this.router.navigate(["/", "home", "events"]);
  }
}

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  template: `
    <div class="event">
      <form [formGroup]="friendForm" class="event__form form sheet-form">
        <div class="form__group sheet-form__group">
          <mat-form-field class="form__field" appearance="outline">
            <mat-label>Name</mat-label>
            <input
              matInput
              placeholder="Enter Name"
              type="text"
              formControlName="name"
            />
          </mat-form-field>
        </div>

        <div class="form__group sheet-form__group">
          <mat-form-field class="form__field" appearance="outline">
            <mat-label>Age</mat-label>
            <input
              matInput
              placeholder="Enter Age"
              type="number"
              formControlName="age"
            />
          </mat-form-field>
        </div>

        <div
          class="form__group form__action sheet-form__group sheet-form__action"
        >
          <button
            mat-flat-button
            class="form__continue"
            (click)="closeSheet($event)"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ["./details.page.scss"],
})
export class BottomSheetOverviewSheet {
  friendForm: FormGroup;
  submitted: boolean;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheet>,
    private formBuilder: FormBuilder
  ) {
    this.submitted = false;
    this.friendForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      age: ["", [Validators.required]],
    });
  }

  // To close the bottom sheet
  closeSheet(event: any): void {
    if (this.friendForm.invalid) {
      return;
    }

    this._bottomSheetRef.dismiss(this.friendForm.value);
    event.preventDefault();
  }
}
