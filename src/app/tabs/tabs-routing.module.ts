import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "activities",
        loadChildren: () =>
          import("../activities/activities.module").then(
            (m) => m.ActivitiesPageModule
          ),
      },
      {
        path: "groups",
        loadChildren: () =>
          import("../groups/groups.module").then((m) => m.GroupsPageModule),
      },
      {
        path: "messaging",
        loadChildren: () =>
          import("../messaging/messaging.module").then(
            (m) => m.MessagingPageModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("../profile/profile.module").then((m) => m.ProfilePageModule),
      },
      {
        path: "myads",
        loadChildren: () =>
          import("../myads/myads.module").then((m) => m.MyadsPageModule),
      },
      {
        path: "event",
        loadChildren: () =>
          import("../activities/details/details.module").then(
            (m) => m.DetailsPageModule
          ),
      },
      {
        path: "event/:title",
        loadChildren: () =>
          import("../activities/details/details.module").then(
            (m) => m.DetailsPageModule
          ),
      },
      {
        path: "events",
        loadChildren: () =>
          import("../events/events.module").then((m) => m.EventsPageModule),
      },
      {
        path: "",
        redirectTo: "/home/activities",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/home/activities",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
