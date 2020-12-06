import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SharedPageRoutingModule } from "./shared-routing.module";

import { SharedPage } from "./shared.page";
import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageRoutingModule,
    AngularMaterialModule,
  ],
  declarations: [SharedPage],
})
export class SharedPageModule {}
