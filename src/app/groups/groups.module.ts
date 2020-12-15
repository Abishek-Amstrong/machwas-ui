import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GroupsPageRoutingModule } from "./groups-routing.module";

import { GroupsPage } from "./groups.page";

import { SMS } from "@ionic-native/sms/ngx";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GroupsPageRoutingModule],
  declarations: [GroupsPage],
  providers: [SMS],
})
export class GroupsPageModule {}
