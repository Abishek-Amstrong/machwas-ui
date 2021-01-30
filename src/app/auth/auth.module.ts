import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AuthPageRoutingModule } from "./auth-routing.module";

import { AuthPage } from "./auth.page";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    AngularMaterialModule,
  ],
  declarations: [AuthPage, RegisterComponent],
})
export class AuthPageModule {}
