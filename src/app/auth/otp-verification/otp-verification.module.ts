import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { OtpVerificationPageRoutingModule } from "./otp-verification-routing.module";

import { OtpVerificationPage } from "./otp-verification.page";
import { AngularMaterialModule } from "src/app/shared/angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    OtpVerificationPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  declarations: [OtpVerificationPage],
})
export class OtpVerificationPageModule {}
