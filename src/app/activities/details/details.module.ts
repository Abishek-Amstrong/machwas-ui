import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DetailsPageRoutingModule } from "./details-routing.module";

import { DetailsPage } from "./details.page";
import { AngularMaterialModule } from "src/app/shared/angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [DetailsPage],
})
export class DetailsPageModule {}
