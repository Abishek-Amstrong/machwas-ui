import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  userName: string;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {
    this.userName = "";
  }

  ngOnInit() {}

  navToActivities() {
    localStorage.setItem("userMobile", "9500156799");
    this.router.navigate(["/", "home", "activities"]);
  }

  async navToRegister() {
    if (this.userName) {
      this.router.navigate(["/", "auth", "register", this.userName]);
    } else {
      const toast = await this.toastController.create({
        position: "top",
        message: "Please enter name to proceed!",
        duration: 1000,
      });

      toast.present();
    }
  }
}
