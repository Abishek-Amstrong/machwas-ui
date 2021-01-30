import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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
  friends = [
    new User("assets/images/male.svg", 17, "Akash Solanki"),
    new User("assets/images/female.svg", 22, "Avinash Dubey"),
    new User("assets/images/profile.svg", 26, "Nikesh Gupta"),
    new User("assets/images/male.svg", 19, "Pawan Kalyan"),
    new User("assets/images/female.svg", 21, "Ram Ganesh"),
    new User("assets/images/profile.svg", 32, "Rahul Singh"),
  ];
  selectedFriends: User[] = new Array<User>();
  filteredFriends: Observable<User[]>;
  lastFilter: string = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private bottomSheet: MatBottomSheet
  ) {
    this.submitted = false;
    this.eventForm = this.formBuilder.group({
      eventTime: ["", [Validators.required]],
      friendsList: ["", [Validators.required]],
      location: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.filteredFriends = this.eventForm.get("friendsList").valueChanges.pipe(
      startWith<string | User[]>(""),
      map((value) => (typeof value === "string" ? value : this.lastFilter)),
      map((filter) => this._filter(filter))
    );
  }

  openBottomSheet(): void {
    this.bottomSheet
      .open(BottomSheetOverviewSheet)
      .afterDismissed()
      .subscribe(
        (result) => {
          console.log(result);
          if (result) {
            this.friends.push(
              new User("assets/images/male.svg", result.age, result.name, true)
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
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.friends.slice();
    }
  }

  displayFn(value: User[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((user, index) => {
        if (index === 0) {
          displayValue = user.name;
        } else {
          displayValue += ", " + user.name;
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

  toggleSelection(user: User) {
    user.selected = !user.selected;
    if (user.selected) {
      this.selectedFriends.push(user);
    } else {
      const i = this.selectedFriends.findIndex(
        (value) => value.name === user.name
      );
      this.selectedFriends.splice(i, 1);
    }

    this.eventForm.get("friendsList").setValue(this.selectedFriends);
  }

  navToEvents() {
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

  closeSheet(event: any): void {
    if (this.friendForm.invalid) {
      return;
    }

    this._bottomSheetRef.dismiss(this.friendForm.value);
    event.preventDefault();
  }
}
