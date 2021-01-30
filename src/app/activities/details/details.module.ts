import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DetailsPageRoutingModule } from "./details-routing.module";

import { BottomSheetOverviewSheet, DetailsPage } from "./details.page";
import { AngularMaterialModule } from "src/app/shared/angular-material.module";
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material/bottom-sheet";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
  ],
  declarations: [DetailsPage, BottomSheetOverviewSheet],
  entryComponents: [BottomSheetOverviewSheet],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
  ],
})
export class DetailsPageModule {}
