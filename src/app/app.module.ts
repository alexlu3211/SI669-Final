import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { SearchPage } from '../pages/search/search';
import { PeoplePage } from '../pages/people/people';
import { ProfilePage } from '../pages/profile/profile';
import { SchedulePage } from '../pages/schedule/schedule';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { RestaurantListPageModule } from '../pages/restaurant-list/restaurant-list.module';
import { RestaurantDetailPageModule } from '../pages/restaurant-detail/restaurant-detail.module';
import { RestaurantSchedulePageModule } from '../pages/restaurant-schedule/restaurant-schedule.module';
import { ProfileEditPageModule } from '../pages/profile-edit/profile-edit.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { ScheduleDetailPageModule } from '../pages/schedule-detail/schedule-detail.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { DataProvider } from '../providers/data/data';


@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    PeoplePage,
    ProfilePage,
    SchedulePage,
    TabsPage,
    LoginPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
      iconMode: 'md',
      // modalEnter: 'modal-slide-in',
      // modalLeave: 'modal-slide-out',
      // tabsPlacement: 'bottom',
      pageTransition: 'ios'
    }),
    RestaurantListPageModule,
    RestaurantDetailPageModule,
    RestaurantSchedulePageModule,
    ProfileEditPageModule,
    SignupPageModule,
    ScheduleDetailPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    PeoplePage,
    ProfilePage,
    SchedulePage,

    TabsPage,
    LoginPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
