import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SharedPageRoutingModule } from "./shared-routing.module";

import { SharedPage } from "./shared.page";
import { AngularMaterialModule } from "./angular-material.module";
import { TinderUIComponent } from "./components/event-swipes/event-swipes.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageRoutingModule,
    AngularMaterialModule,
  ],
  declarations: [SharedPage, TinderUIComponent],
})
export class SharedPageModule {}
