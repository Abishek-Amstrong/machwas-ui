import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MyadsPageRoutingModule } from "./myads-routing.module";

import { MyadsPage } from "./myads.page";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { TinderUIComponent } from "../shared/components/event-swipes/event-swipes.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyadsPageRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  declarations: [MyadsPage, TinderUIComponent],
})
export class MyadsPageModule {}
