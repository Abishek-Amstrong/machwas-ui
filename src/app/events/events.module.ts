import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EventsPageRoutingModule } from "./events-routing.module";

import { EventsPage } from "./events.page";
import { AngularMaterialModule } from "../shared/angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    AngularMaterialModule,
  ],
  declarations: [EventsPage],
})
export class EventsPageModule {}
