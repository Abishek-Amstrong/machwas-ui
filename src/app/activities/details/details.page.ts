import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
})
export class DetailsPage implements OnInit {
  eventForm: FormGroup;
  submitted: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.submitted = false;
    this.eventForm = this.formBuilder.group({
      eventTime: ["", [Validators.required]],
      friendsList: ["", [Validators.required]],
      location: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  navToEvents() {
    this.router.navigate(["/", "home", "events"]);
  }
}
