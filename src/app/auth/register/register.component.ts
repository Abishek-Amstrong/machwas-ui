import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { AccountService } from "src/app/shared/services/account.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
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
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      userDOB: ["", [Validators.required]],
      employment: [""],
      description: ["", [Validators.required]],
    });
  }

  ionViewWillEnter() {
    this.form = this.fb.group({
      mobileNo: ["", Validators.required],
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      userDOB: ["", [Validators.required]],
      employment: [""],
      description: ["", [Validators.required]],
    });

    this.route.paramMap.subscribe((params) => {
      this.userName = params.get("userName");
      this.form.patchValue({
        userName: this.userName,
      });
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

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.accountService.register(this.form.value).subscribe(
      (result: any) => {
        localStorage.setItem("userMobile", result._id);
        localStorage.setItem("userName", result.userName);
        this.toasterService.success("Registered Successfully");
        this.router.navigate(["/", "home", "activities"]);
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }
}
