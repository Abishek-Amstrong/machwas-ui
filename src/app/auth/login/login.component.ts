import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { AccountService } from "src/app/shared/services/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userName: string;
  submitted: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toasterService: ToastrService
  ) {
    this.userName = "";
    this.submitted = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      mobileNo: ["", Validators.required],
    });
  }

  ionViewWillEnter() {
    this.form = this.fb.group({
      mobileNo: ["", Validators.required],
    });
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
    if (this.form.invalid) {
      return;
    }

    this.accountService.getOTP(this.form.value.mobileNo).subscribe(
      (result: any) => {
        sessionStorage.setItem("sessionId", result.Details);
        this.router.navigate([
          "/",
          "auth",
          "otp-verification",
          this.form.value.mobileNo,
        ]);
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }
}
