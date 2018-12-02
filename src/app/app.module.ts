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

<<<<<<< HEAD
import { RestaurantListPageModule } from '../pages/restaurant-list/restaurant-list.module';
import { ProfileEditPageModule } from '../pages/profile-edit/profile-edit.module';
=======
import { LoginPage } from '../pages/login/login';

import { RestaurantListPageModule } from '../pages/restaurant-list/restaurant-list.module';
import { ProfileEditPageModule } from '../pages/profile-edit/profile-edit.module';
import { SignupPageModule } from '../pages/signup/signup.module';
>>>>>>> refs/remotes/origin/master

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
<<<<<<< HEAD
=======

import { RestaurantDataProvider } from '../providers/restaurant-data/restaurant-data';
import { ProfileDataProvider } from '../providers/profile-data/profile-data';
>>>>>>> refs/remotes/origin/master
import { DataProvider } from '../providers/data/data';


@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    PeoplePage,
    ProfilePage,
    SchedulePage,
<<<<<<< HEAD
    TabsPage
=======
    TabsPage,
    LoginPage
>>>>>>> refs/remotes/origin/master
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'md',
      // modalEnter: 'modal-slide-in',
      // modalLeave: 'modal-slide-out',
      // tabsPlacement: 'bottom',
      pageTransition: 'ios'
    }),
    RestaurantListPageModule,
<<<<<<< HEAD
    ProfileEditPageModule
=======
    ProfileEditPageModule,
    SignupPageModule
>>>>>>> refs/remotes/origin/master
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    PeoplePage,
    ProfilePage,
    SchedulePage,
<<<<<<< HEAD
    TabsPage
=======
    TabsPage,
    LoginPage
>>>>>>> refs/remotes/origin/master
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
<<<<<<< HEAD
=======
    RestaurantDataProvider,
    ProfileDataProvider,
>>>>>>> refs/remotes/origin/master
    DataProvider
  ]
})
export class AppModule {}
