import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./messaging/chat/chat.component";
import { AuthGaurdService } from "./shared/services/auth.gaurd.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home/activities",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.AuthPageModule),
  },
  {
    path: "shared",
    loadChildren: () =>
      import("./shared/shared.module").then((m) => m.SharedPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: "groups",
    loadChildren: () =>
      import("./groups/groups.module").then((m) => m.GroupsPageModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: "chat",
    component: ChatComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: "chat/:name",
    component: ChatComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: "myads",
    loadChildren: () =>
      import("./myads/myads.module").then((m) => m.MyadsPageModule),
    canActivate: [AuthGaurdService],
  },
  { path: "**", redirectTo: '"home/activities', pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
