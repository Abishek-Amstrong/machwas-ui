import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { handleError } from "src/app/shared/helpers/error-handler";
import { AccountService } from "src/app/shared/services/account.service";
import { CompressImageService } from "src/app/shared/services/compress-image.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: "app-update",
  templateUrl: "./update.page.html",
  styleUrls: ["./update.page.scss"],
})
export class UpdatePage implements OnInit {
  form: FormGroup;
  userName: string;
  submitted: boolean;
  userInfo: any;
  imageUrl: any;
  selectedFile: ImageSnippet;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toasterService: ToastrService,
    private compressService: CompressImageService
  ) {
    this.userName = "";
    this.submitted = false;
    this.userInfo = {};
    this.imageUrl = "assets/images/profile.svg";

    this.form = this.fb.group({
      mobileNo: ["", Validators.required],
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      userDOB: ["", [Validators.required]],
      employment: [""],
      description: ["", [Validators.required]],
      profilePic: [""],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.form = this.fb.group({
      mobileNo: ["", Validators.required],
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      userDOB: ["", [Validators.required]],
      employment: [""],
      description: ["", [Validators.required]],
      profilePic: [""],
    });

    this.accountService
      .getUsersList(localStorage.getItem("userMobile"))
      .subscribe(
        (result: any) => {
          console.log(result);
          this.userInfo = result;
          this.userName = result.userName;
          this.imageUrl =
            "profilePic" in result
              ? result.profilePic
              : "assets/images/profile.svg";
          this.form.patchValue({
            mobileNo: result.mobileNo,
            userName: result.userName,
            email: result.email,
            userDOB: result.userDOB,
            employment: result.employment,
            description: result.description,
            profilePic: "profilePic" in result ? result.profilePic : "",
          });
        },
        (err) => {
          this.toasterService.error(handleError(err));
        }
      );
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
    console.log(this.form.value);
    this.accountService.updateProfile(this.form.value).subscribe(
      (result) => {
        this.form.reset();
        this.router.navigate(["/", "profile"]);
      },
      (err) => {
        this.toasterService.error(handleError(err));
      }
    );
  }

  // Handle file upload
  uploadFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(
        event.target.result,
        event.target.result
      );
      this.imageUrl = this.selectedFile.src.toString();

      this.form.patchValue({
        profilePic: this.selectedFile.file.toString(),
      });
    });

    reader.readAsDataURL(file);
  }
}
