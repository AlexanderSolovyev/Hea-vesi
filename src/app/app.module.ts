import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import {FormsModule } from "@angular/forms";
import {NativeStorage} from "@ionic-native/native-storage";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

import { HomePage } from '../pages/home/home';
import {OrderPage} from "../pages/order/order";
import {OkPage} from "../pages/ok/ok";
import {SettingsPage} from "../pages/settings/settings";
import { LoginPage} from '../pages/login/login';
import { SignupPage} from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';
import {StorageService} from "../pages/storage.service";
import { InfoPage } from '../pages/info/info';
import {RememberPage} from '../pages/remember/remember';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OrderPage,
    OkPage,
    SettingsPage,
    LoginPage,
    SignupPage,
    InfoPage,
    RememberPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OrderPage,
    OkPage,
    SettingsPage,
    LoginPage,
    SignupPage,
    InfoPage,
    RememberPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    StorageService,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
