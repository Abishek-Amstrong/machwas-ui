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
