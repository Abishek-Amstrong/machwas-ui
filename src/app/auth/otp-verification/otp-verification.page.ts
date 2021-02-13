import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { AccountService } from "src/app/shared/services/account.service";

@Component({
  selector: "app-otp-verification",
  templateUrl: "./otp-verification.page.html",
  styleUrls: ["./otp-verification.page.scss"],
})
export class OtpVerificationPage implements OnInit {
  form: FormGroup;
  submitted: boolean;
  mobileNumber: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toasterService: ToastrService
  ) {
    this.submitted = false;
    this.mobileNumber = "";
  }

  ngOnInit() {
    this.form = this.fb.group({
      otp: ["", Validators.required],
    });
  }

  ionViewWillEnter() {
    this.form = this.fb.group({
      otp: ["", Validators.required],
    });
    this.mobileNumber = this.route.snapshot.paramMap.get("id");
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  navToActivities() {
    this.router.navigate(["/", "home", "activities"]);
  }

  // To create a new user
  registerUser() {
    this.submitted = true;

    console.log(this.form);

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.accountService.register(this.form.value).subscribe(
      (result) => {
        this.router.navigate(["/", "auth", "landing"]);
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }
}
