import { Injectable, NgModule } from "@angular/core";
import {
  BrowserModule,
  HammerGestureConfig,
  HammerModule,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChatComponent } from "./messaging/chat/chat.component";
import { AngularMaterialModule } from "./shared/angular-material.module";
import { SMS } from "@ionic-native/sms/ngx";

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pan: { enable: true },
  };
}

@NgModule({
  declarations: [AppComponent, ChatComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HammerModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
    SMS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
